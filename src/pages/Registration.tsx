import React from 'react'
import { useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, IonInput, IonButton, IonText, useIonAlert, IonHeader, IonToolbar, isPlatform, IonRouterLink, IonNavLink, IonLabel, IonItem, IonImg, IonTitle } from '@ionic/react';
import BackButton from '../components/BackButton';
import { registerUser } from '../firebaseConfig'
import '../styles/Registration.css'

const Registration: React.FC = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [presentAlert] = useIonAlert();

    const createAccount = () => {
        if (username === "" || password === "" || confirmPassword === "") {
            presentAlert({ header: "Empty fields!", message: 'Fields can not be empty!', buttons: ['OK'] })
        }
        else if (password === confirmPassword) {
            const res = registerUser(username, password)
            if (res != null) {
                presentAlert({
                    message: "Uspešno ustvarjen račun", buttons: [{
                        text: 'OK', handler: () => {
                            window.location.assign('/home')
                        },
                    }]
                })
            }
            else {
                presentAlert({ message: "Prevri pravilnen vnos podatkov!" })
            }
        }
    }

    return (
        <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IonHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonToolbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <BackButton path={"login"}></BackButton>
                </IonToolbar>
            </IonHeader>

            <IonContent placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonCard placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonCardHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <IonCardSubtitle color={"medium"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >USTVARI SI RAČUN</IonCardSubtitle>
                        <IonCardTitle color={"favorite-white"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Ustvari račun</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <div className='inputGroup'>
                            <IonText className='userText' color={"favorite-white"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Email</IonText>
                            <IonInput className='userInput' color={"favorite-black"} placeholder='  Elektronski naslov' type='email' onIonChange={(e: any) => setUsername(e.target.value)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonInput>

                            <p style={{ padding: "2px" }}></p>

                            <IonText className='userText' color={"favorite-white"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Geslo</IonText>
                            <IonInput className='userInput' color={"favorite-black"} placeholder='  Geslo' type='password' onIonChange={(e: any) => setPassword(e.target.value)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonInput>

                            <p style={{ padding: "2px" }}></p>

                            <IonText className='userText' color={"favorite-white"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Geslo</IonText>
                            <IonInput className='userInput' color={"favorite-black"} placeholder='  Potrdi geslo' type='password' onIonChange={(e: any) => setConfirmPassword(e.target.value)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonInput>
                            <IonCardContent class='login-card-buttons' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <IonButton onClick={() => createAccount()} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Ustvari račun</IonButton>
                            </IonCardContent>
                        </div>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage >
    );
}
export default Registration;