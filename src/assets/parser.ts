import { MessageArrayItem } from "./utils";

function message_array_parser(msgs: Array<MessageArrayItem>): string {
    let rmsg = "";
    for (let i = 0; i < msgs.length; i++) {
        rmsg += message_parser(msgs[i]);
    }
    return rmsg;
}

function message_parser(msg: MessageArrayItem): string {
    let rmsg = ""
    let url = ""
    switch (msg.type) {
        case "text":
            rmsg = (msg.data.text as string);
            break;
        case "image":
            if (msg.data.url) {
                url = msg.data.url
                rmsg = '<img style="max-width:100%" src="/web/img?url=' + encodeURIComponent(url) + '">';
            } else if (msg.data.file) {
                if (msg.data.file.slice(0, 9) === "base64://") {
                    rmsg = '<img style="max-width:100%" src="data:image/jpg;base64,' + msg.data.file.slice(9,) + '"/>'
                } else if (msg.data.file.slice(0, 4) === "http") {
                    url = msg.data.file
                    rmsg = '<img style="max-width:100%" src="' + url + '">';
                } else {
                    rmsg = JSON.stringify(msg)
                }
            }
            break;
        case "at":
            rmsg = '<span style="color:#377ec8"> @' + (msg.data.qq as string) + ' </span>';
            break;
        default:
            rmsg = JSON.stringify(msg)
    }
    console.log(rmsg)
    return rmsg;
}

export default message_array_parser