import { _decorator, Component, JsonAsset } from "cc"

const { ccclass, property } = _decorator

@ccclass("HelloWorld")
export class HelloWorld extends Component {
    @property({  })
    message: string = "Hello, World!"

    @property({ type: JsonAsset })
    json: JsonAsset = null

    protected onLoad(): void {
        console.log(this.message, this.json)
    }
}

