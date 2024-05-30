import React from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonButton } from '@ionic/react';
import '../styles/DrinkCard.css'
const DrinkCard: React.FC = () => {
    return (
        <IonCard>
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" width={"100%"}></img>
            <IonButton>Dodaj</IonButton>

            {/* <IonCardHeader>
                    <IonCardTitle>Card Title</IonCardTitle>
                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                    Here's a small text description for the card content. Nothing more, nothing less.
                </IonCardContent> */}
        </IonCard>
    );
};

export default DrinkCard;
