import { MailBody } from 'interface';
import * as Mailgen from 'mailgen'

 function genEmailString( mailBody: MailBody){

    let mailGenerator=new Mailgen({
        theme:"default",
        product:{
            name:mailBody.productName,
            link:mailBody.productWebUrl
        }
    })
    let email={
        body:{
            greeting:"Hello",
            signature:"Xin Chao",
            name:mailBody.receiverName,
            intro:"CHUNG TOI LA",
            action:{
                    instructions:`Xin chao ${mailBody.productName} bam vao nut nhan!`,
                    button:{
                        color: '#22BC66',
                        text: "Xác nhận",
                        link: mailBody.confirmLink
                    }
            },
            outro:`Outro`
        }
    }
    return mailGenerator.generate(email);

}
export default genEmailString