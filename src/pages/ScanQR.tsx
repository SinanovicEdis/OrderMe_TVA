import React from "react";
import { IonButton, IonContent, IonHeader, IonIcon, IonImg, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import scanIcon from '../assets/icons/scan-sharp.svg'
import "../styles/ScanQR.css"
import BackButton from "../components/BackButton";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { child, Database, get, getDatabase, ref } from "firebase/database";
import { changeDB } from "../firebaseConfig";

const ScanQR: React.FC = () => {

    async function scanQRcode() {
        const data = await BarcodeScanner.scan();
        // alert(JSON.stringify(data));
        localStorage.removeItem("database")
        localStorage.setItem("database", data.text)

        window.location.assign("home")
    }

    function changeDb(): void {
        if (localStorage.getItem("database")) {
            localStorage.removeItem("database")
        } else {
            localStorage.setItem("database", "https://orderme-c0395-default-rtdb.europe-west1.firebasedatabase.app")
        }

        window.location.assign("home")
    }

    return (
        <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IonHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonToolbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <BackButton path={"home"}></BackButton>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen style={{ Height: "100%" }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className="title">
                    <div style={{ whiteSpace: "normal", fontSize: "5.0vw" }}>
                        <IonLabel color={"favorite-black"} className="title-content" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Poskeniraj QR kodo,</IonLabel>
                        <br></br>
                        <IonLabel color={"favorite-black"} className="title-content" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>&nbsp; najdeš jo na mizi!</IonLabel>
                    </div>
                </div>

                <div className="qr-code-img-div">
                    <IonImg className="qr-code-img" src="https://cdn-icons-png.flaticon.com/512/714/714390.png" alt="qr code scan" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonImg>
                </div>

                <div className="div-button" style={{ backgroundColor: "", height: "20%" }}>
                    <IonButton color={"favorite-green"} className="scan-btn" onClick={() => scanQRcode()} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <IonIcon color="favorite-white" src={scanIcon} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon>
                        &nbsp; Scan QR code</IonButton>
                </div>
                <IonButton onClick={() => changeDb()} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>change db</IonButton>
            </IonContent>
        </IonPage >
    )
}

export default ScanQR


