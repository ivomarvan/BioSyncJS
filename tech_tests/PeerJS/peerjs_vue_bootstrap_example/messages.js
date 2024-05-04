/**
 * Class Messages handles text message manipulations.
 * @class
 */

class Messages {
    static characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    static length_placeholder = '<length_plceholder>';
    static two_double_quotes_len = 2;
    
    static getSerialized(msgObj) {
        let jsonString = JSON.stringify(msgObj);
        if (msgObj.type == 'long_message') {
            // Replace length_placeholder with actual length (padded with zeros)
            let replacament_len = String(jsonString.length).padStart(this.length_placeholder.length, '0');
            jsonString = jsonString.replace(this.length_placeholder, replacament_len);
        }
        return jsonString;
    }
    
    static getDeserialized(msgStr) {
        let msgObj = JSON.parse(msgStr);
        msgObj.created = new Date(msgObj.created);
        if (msgObj.type == 'long_message') {
            msgObj.actual_len = msgObj.actual_len - 0; // Convert string to number
        }
        return msgObj;
    }

    static formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }



    static getSeed(length = 10) {
        let result = '';
        const charactersLength = this.characters.length;
        for (let i = 0; i < length; i++) {
            result += this.characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static genTxtForTest(seed, requested_sizeKB = 1) {
        // Vytvoří zprávu délky sizeKB pro daný seed
        const sizeInBytes = Math.round(requested_sizeKB * 1024);
        let result = '';
        const seedLength = seed.length;
        while (result.length < sizeInBytes) {
            result += seed.repeat(Math.ceil((sizeInBytes - result.length) / seedLength)).slice(0, sizeInBytes - result.length);
        }
        return result;
    }

    static getShortMsgObj(msgTxt, sender, type = 'short_message') {
        return {
            type: type,
            message: msgTxt,
            created: new Date(),
            sender: sender
        };
    }
    static getLongMsgObj(requested_sizeKB = 1, sender, seed='') {
        if (seed === '') {
            seed = this.getSeed((requested_sizeKB * 1024) / this.characters.length);
        }
        const msgTxt = this.genTxtForTest(seed, requested_sizeKB);
        var msgObj = this.getShortMsgObj(msgTxt, sender,'long_message');
        msgObj.actual_len = this.length_placeholder;
        msgObj.seed = seed;
        msgObj.requested_KB = requested_sizeKB;
        msgObj.created = new Date();
        return msgObj;
    }
}; // Messages


// // Tests
// msgObj = Messages.getLongMsgObj(0.2);
// console.log(msgObj);
// const msgStr = Messages.getSerialized(msgObj);
// console.log(msgStr);
// const msgObj2 = Messages.getDeserialized(msgStr);
// console.log(msgObj2);
// console.log('-----------------------------------');
// console.log(msgObj==msgObj2);
//
// setTimeout(() => {
//     console.log(new Date() - msgObj.created);
// }, 200);
