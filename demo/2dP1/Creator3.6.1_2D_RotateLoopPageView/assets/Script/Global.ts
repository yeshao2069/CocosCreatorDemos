import { _decorator, EventTarget } from 'cc';

class Global {
	static readonly Instance: Global = new Global();
    eventBus: EventTarget = new EventTarget();;
}
export const GG = Global.Instance;
