
import { _decorator, Vec2, v2, IVec2Like } from 'cc';
import { Vehicle } from './Vehicle';
const { ccclass, property } = _decorator;

const temp_v2 = v2()
const temp2_v2 = v2()
const temp3_v2 = v2()
const temp4_v2 = v2()
const temp5_v2 = v2()
 

@ccclass('SteeredVehicle')
export class SteeredVehicle extends Vehicle {
    @property
    maxForce: number = 1
    @property
    arrivalThreshold: number = 100

    @property
    wanderAngle: number = 0;
    @property
    wanderDistance: number = 10;
    @property
    wanderRadius: number = 5;
    @property
    wanderRange: number = 2;

    pathIndex: number = 0;
    @property
    pathThreshold: number = 20;

    @property
    inSightDist: number = 200;
    @property
    tooCloseDist: number = 60;


    @property
    avoidDistance: number = 300;
    @property
    avoidBuffer: number = 20;

    private _steeredForce: Vec2 = v2()

    seek(target: Vec2): void {
        const desiredVelocity: Vec2 = Vec2.subtract(temp_v2, target, this._position).normalize()
        desiredVelocity.multiplyScalar(this.maxSpeed);
        const force: Vec2 = desiredVelocity.subtract(this.velocity);
        this._steeredForce.add(force);
    }

    flee(target: Vec2): void {
        const desiredVelocity: Vec2 = Vec2.subtract(temp_v2, target, this._position).normalize()
        desiredVelocity.multiplyScalar(this.maxSpeed);
        const force: Vec2 = desiredVelocity.subtract(this.velocity);
        this._steeredForce.subtract(force);
    }

    arrive(target: Vec2): void {
        const desiredVelocity: Vec2 = Vec2.subtract(temp_v2, target, this._position).normalize()
        const dist: number = Vec2.distance(this._position, target)
        if (dist > this.arrivalThreshold) {
            desiredVelocity.multiplyScalar(this.maxSpeed);
        } else {
            desiredVelocity.multiplyScalar(this.maxSpeed * dist / this.arrivalThreshold);
        }
        const force: Vec2 = desiredVelocity.subtract(this.velocity);
        this._steeredForce.add(force);
    }

    pursue(target: Vehicle): void {
        const toTarget = Vec2.subtract(temp_v2, target.position, this._position)
        if (toTarget.dot(this.heading) > 0 && this.heading.dot(target.heading) < -0.95) {
            // 如果面对面，正好在前面，就直接飞过去
            this.seek(target.position)
        } else {
            const lookAheadTime: number = Vec2.distance(this._position, target.position) / (this.maxSpeed + target.velocity.length());
            const predictedTarget: Vec2 = Vec2.add(temp2_v2, target.position, Vec2.multiplyScalar(temp_v2, target.velocity, lookAheadTime));
            this.seek(predictedTarget)
        }
    }

    pursueOffset(target: Vehicle, offset: Vec2): void {
        const localOffset = temp_v2.set(
            target.side.x * offset.x + target.side.y * offset.y,
            target.heading.x * offset.x + target.heading.y * offset.y
        )
        const offsetTargetPos = Vec2.add(temp_v2, target.position, localOffset)
        const lookAheadTime: number = Vec2.distance(this._position, offsetTargetPos) / (this.maxSpeed + target.velocity.length())
        const predictedTarget: Vec2 =
            Vec2.add(
                temp2_v2,
                offsetTargetPos,
                Vec2.multiplyScalar(temp2_v2, target.velocity, lookAheadTime),
            );
        this.arrive(predictedTarget)
    }

    evade(target: Vehicle): void {
        const lookAheadTime: number = Vec2.distance(this._position, target.position) / (this.maxSpeed + target.velocity.length())
        const predictedTarget: Vec2 = Vec2.add(temp2_v2, target.position, Vec2.multiplyScalar(temp_v2, target.velocity, lookAheadTime));
        this.flee(predictedTarget)
    }

    wander(): void {
        const center: Vec2 = Vec2.multiplyScalar(temp_v2, this.heading, this.wanderDistance)
        const offset: Vec2 = temp2_v2.set(this.wanderRadius, 0)
        offset.rotate(this.wanderAngle + Math.random() * this.wanderRange - this.wanderRange * .5)
        const force: Vec2 = center.add(offset);
        this._steeredForce.add(force);
    }

    avoid(circles: Vehicle[]): void {
        for (let i = 0; i < circles.length; i++) {
            const circle = circles[i];
            const heading: Vec2 = temp_v2.set(this.velocity)
            heading.normalize()
            // 障碍物和机车间的位移向量 
            const difference: Vec2 = Vec2.subtract(temp2_v2, circle.position, this._position)//circle.position.subtract(_position);
            const dotProd = difference.dot(heading);
            // 如果障碍物在机车前方 
            if (dotProd > 0) {
                // 机车的“触角” 
                const feeler: Vec2 = Vec2.multiplyScalar(temp3_v2, heading, this.avoidDistance) //heading.multiply(this.avoidDistance);
                // 位移在触角上的映射 
                const projection: Vec2 = Vec2.multiplyScalar(temp4_v2, heading, dotProd) //heading.multiply(dotProd);
                // 障碍物离触角的距离 
                const dist = Vec2.subtract(temp5_v2, projection, difference).length()// projection.subtract(difference).length;
                // 如果触角（在算上缓冲后）和障碍物相交 
                // 并且位移的映射的长度小于触角的长度 
                // 我们就说碰撞将要发生，需改变转向 
                const projection_length = projection.length()
                const feeler_length = feeler.length()
                if (dist < circle.radius + this.avoidBuffer &&
                    projection_length < feeler_length) {
                    // 计算出一个转 90 度的力 
                    const force: Vec2 = Vec2.multiplyScalar(temp5_v2, heading, this.maxSpeed)// heading.multiply(this.maxSpeed);
                    force.rotate(difference.signAngle(this.velocity) * Math.PI / 2);
                    // 通过离障碍物的距离，调整力度大小，使之足够小但又能避开 
                    force.multiplyScalar(1.0 - projection_length / feeler_length);
                    // 叠加于转向力上 
                    this._steeredForce.add(force);
                    // 刹车——转弯的时候要放慢机车速度，离障碍物越接近，刹车越狠。 
                    this.velocity.multiplyScalar(projection_length / feeler_length)
                }
            }
        }
    }


    followPath(path: Vec2[], loop: Boolean = false): void {
        const wayPoint: Vec2 = path[this.pathIndex];
        if (wayPoint == null) return;
        if (Vec2.squaredDistance(wayPoint, this.position) < this.pathThreshold * this.pathThreshold) {
            if (this.pathIndex >= path.length - 1) {
                if (loop) {
                    this.pathIndex = 0;
                }
            } else {
                this.pathIndex++;
            }
        }
        if (this.pathIndex >= path.length - 1 && !loop) {
            this.arrive(wayPoint);
        } else {
            this.seek(wayPoint);
        }
    }


    flock(vehicles: Vehicle[]): void {
        let averageVelocity: Vec2 = temp3_v2.set(this.velocity)
        let averagePosition: Vec2 = temp4_v2.set(0, 0)
        let inSightCount = 0;
        for (let i = 0; i < vehicles.length; i++) {
            let vehicle: Vehicle = vehicles[i] as Vehicle;
            if (vehicle != this && this.inSight(vehicle)) {
                averageVelocity = averageVelocity.add(vehicle.velocity);
                averagePosition = averagePosition.add(vehicle.position);
                if (Vec2.squaredDistance(this.position, vehicle.position) < this.tooCloseDist * this.tooCloseDist) this.flee(vehicle.position);
                inSightCount++;
            }
        }
        if (inSightCount > 0) {
            averageVelocity.multiplyScalar(1 / inSightCount);
            averagePosition.multiplyScalar(1 / inSightCount);
            this.seek(averagePosition);
            const force = averageVelocity//.subtract(inSightCount)
            this._steeredForce.subtract(force);

        }
    }

    private inSight(vehicle: Vehicle) {
        if (Vec2.squaredDistance(this.position, vehicle.position) > (this.inSightDist * this.inSightDist)) return false;

        const heading: Vec2 = temp_v2.set(this.velocity)
        heading.normalize()
        const difference: Vec2 = Vec2.subtract(temp2_v2, vehicle.position, this.position)
        const dotProd = difference.dot(heading);
        if (dotProd < 0) return false;
        return true;
    }

    fixedUpdate() {
        if (this._steeredForce.lengthSqr() > this.maxForce * this.maxForce) {
            this._steeredForce.multiplyScalar(this.maxForce / this._steeredForce.length())
        }
        this._steeredForce.multiplyScalar(1 / this.mass)
        this.velocity.add(this._steeredForce)
        this._steeredForce.set(0, 0)
        super.fixedUpdate()
    }
}

