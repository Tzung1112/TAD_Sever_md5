import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// thay config thành config của bạn
const firebaseConfig = {
    apiKey: "AIzaSyAwRbIQ_4gNoH4RDyRfQJgtkuzR8o9vylo",
    authDomain: "md5tdt.firebaseapp.com",
    projectId: "md5tdt",
    storageBucket: "md5tdt.appspot.com",
    messagingSenderId: "432497516863",
    appId: "1:432497516863:web:d497ecd5939e91fc75b38a",
    measurementId: "G-RV2HS05T4E"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFileToStorage(file: any, folderName: any, bufferData: any = undefined) {
    console.log("🚀 ~ file: firebase.ts:20 ~ uploadFileToStorage ~ file:", file)
    // nếu file là null thì không làm gì hết
    
    if (!file) {
       
        return false
    }
    
    let fileRef;
    let metadata;
    if (!bufferData) {
        // tên file trên file base
        fileRef = ref(storage, `${folderName}/` + file.originalname);
    } else {
        // tên file trên file base
        fileRef = ref(storage, `${folderName}/` + (file as any).originalname);
        metadata = {
            contentType: (file as any).mimetype,
        };
    }
    let url;
    if (bufferData) {
        // upload file lên fire storage
        url = await uploadBytes(fileRef, bufferData, metadata).then(async res => {
            // khi up thành công thì tìm URL
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    } else {
        // upload file lên fire storage
        url = await uploadBytes(fileRef, file).then(async res => {
            // khi up thành công thì tìm URL
            return await getDownloadURL(res.ref)
                .then(url => url)
                .catch(er => false)
        })
    }
    console.log("result", url);
    
    return url
    
}