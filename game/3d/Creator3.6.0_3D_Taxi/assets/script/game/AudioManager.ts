import { _decorator, AudioClip, resources } from "cc";
const { ccclass, property } = _decorator;

@ccclass("AudioManager")
export class AudioManager {
    public static playMusic(name: string) {
        const path = `audio/music/${name}`;
        resources.load(path, AudioClip, (err, clip) => {
            if (err) {
                console.warn(err);
                return;
            }

            clip!.setLoop(true);
            clip!.play();
        });
    }

    public static playSound(name: string) {
        const path = `audio/sound/${name}`;
        resources.load(path, AudioClip, (err, clip) => {
            if (err) {
                console.warn(err);
                return;
            }

            clip!.setLoop(false);
            clip!.playOneShot(1);
        });
    }
}
