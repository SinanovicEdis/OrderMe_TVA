import React from 'react'
import { useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage, IonInput, IonButton, IonText, useIonAlert, IonHeader, IonToolbar, isPlatform, IonRouterLink, IonNavLink, IonLabel, IonItem, IonImg, IonTitle } from '@ionic/react';
import { loginUser, loginWithFacebook, loginWithGoogle } from '../firebaseConfig';
import '../styles/Login.css'

const Login: React.FC = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [presentAlert] = useIonAlert();

    const [user, setUser] = useState<any>()

    async function loginUsr() {
        if (username === "" || password === "") {
            presentAlert({ header: "Empty fields!", message: 'Fields can not be empty!', buttons: ['OK'] })
        }
        else {
            const res = await loginUser(username, password)
            if (await res === true) {
                window.location.assign('/scan')
            }
            if (await res === false) {
                // alert("Nepravilni podatki")
            }
        }
    }

    async function loginUsrWithGoogle() {
        const res = await loginWithGoogle()
        if (await res === true) {
            window.location.assign('/home')
        }
        if (await res === false) {
            alert("Nepravilni podatki")
        }
    }

    return (
        <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IonHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonToolbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                </IonToolbar>
            </IonHeader>

            <IonContent placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonCard placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonCardHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <IonCardSubtitle color={"medium"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >PRIJAVI SE ZA UPORABO APLIKACIJE</IonCardSubtitle>
                        <IonCardTitle color={"favorite-white"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Prijava</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <div className='userText'>
                            <IonText color={"favorite-white"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Email</IonText>
                        </div>
                        <IonInput className='userInput' color={"favorite-black"} placeholder='  Email' type='email' onIonChange={(e: any) => setUsername(e.target.value)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonInput>

                        <p style={{ padding: "2px" }}></p>
                        <div className='userText'>
                            <IonText color={"favorite-white"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Geslo</IonText>
                        </div>
                        <IonInput className='userInput' color={"favorite-black"} placeholder='  Geslo' type='password' onIonChange={(e: any) => setPassword(e.target.value)} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonInput>
                        <IonCardContent class='login-card-buttons' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <IonButton onClick={() => loginUsr()} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Prijava</IonButton>
                            <IonText placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}><a className='create-account-link' href='/registration' style={{ color: "white" }}>Nimaš računa? Ustvari ga!</a></IonText>
                        </IonCardContent>

                        <div className='providersLogin'>
                            <IonImg className='provider' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1280px-Google_%22G%22_Logo.svg.png' onClick={() => loginWithGoogle()} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonImg>
                            <IonLabel className='provider' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonLabel>
                            <IonImg className='provider' src='https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/1024px-Facebook_f_logo_%282021%29.svg.png?20210818083032' onClick={() => loginWithFacebook()} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonImg>
                        </div>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage >
    );
}
export default Login;