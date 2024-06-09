import {
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React from 'react';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
class QRcodeScan extends React.Component {
    state = {
        stringEncoded: '',
        encodeResponse: 'Hello World',
        dataEncode: ''
    }
    handleChange = (e: any) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        }
        );
        console.log(this.state);
    };
    render() {
        const dataToScan = async () => {
            const data = await BarcodeScanner.scan();
            alert(JSON.stringify(data));
            this.setState({ stringEncoded: data.text })
        };

        return (
            <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonToolbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <IonTitle placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Ionic QR/Barcode Scanner Example</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <strong>Scan Content</strong>
                    <IonButton color="danger" expand="block" onClick={dataToScan} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Scan Data
                    </IonButton>
                    <strong>Generate QR code</strong>
                    <IonItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <IonInput name='dataEncode' value={this.state.encodeResponse} onIonChange={this.handleChange} clearInput placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonInput>
                    </IonItem>
                </IonContent>
            </IonPage >
        );
    }
};
export default QRcodeScan;