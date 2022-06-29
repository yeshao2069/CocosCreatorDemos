export class AvatarBodyparts {
    public static HEAD = 0;
    public static BODY = 1;
    public static HAND = 2;
    public static LEG = 3;
    public static WEAPON = 4;
    public static NUM = 5;

    public static EVENT_CHANGE_PART: string = 'AvatarBodyparts.EVENT_CHANGE_PART';

    private static bodypartsName = ['tou', 'shen', 'shou', 'jiao', 'weapon'];

    public static getNameOfBodypart(part: number, suitId: string) {
        return 'ch_pc_hou_' + suitId + '_' + this.bodypartsName[part];
    }

    public static getPartName(part: number) {
        return this.bodypartsName[part];
    }
}