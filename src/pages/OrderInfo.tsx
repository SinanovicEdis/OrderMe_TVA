import React, { Key } from 'react';
import { IonLabel, IonContent, IonHeader, IonPage, IonAvatar, IonToolbar, IonText, IonTitle, IonIcon, IonButton, IonItem } from '@ionic/react';
import { closeCircle, cardOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import '../styles/OrderInfo.css'
import { useParams } from 'react-router';
import { get, getDatabase, ref } from 'firebase/database';

interface Artikel {
    image: string
    title: string
    uuid: string
}

interface Order {
    order_uuid: string
    price: number
    state: string
    user: string
    user_uuid: string
    payed: Boolean
}

const OrderInfo: React.FC = () => {
    let itemsCount = 0
    let totalPrice = 0
    let VAT = 0

    var data = useParams()
    var param = JSON.parse(JSON.stringify(data))
    const [orders, setOrders] = useState<Order[]>([])
    const [drinks, setDrinks] = useState<Artikel[]>([])
    var payed: Boolean = false

    function GetOrders() {
        var data: any = []
        var filteredUserOrders: any = []
        var drinks: any = []
        const db = getDatabase()

        get(ref(db, '/Orders')).then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();
                    data.push(childData)
                });
                data.map((order: any) => {
                    if (order.order_uuid === param.id) {
                        filteredUserOrders.push(order)
                        drinks.push(order.drinks)
                    }
                })
                setOrders(filteredUserOrders)
                setDrinks(drinks)
            }
            else {
                console.warn("No data available");
            }
        })
    }

    useEffect(() => {
        GetOrders()
        // console.log(orders)
    }, [setOrders])


    return (
        <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IonHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonToolbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <BackButton path={"/User"} />
                    <IonTitle placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{param.id}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className='item-container'>
                    {orders.map((item: any) => (
                        itemsCount = 0,
                        totalPrice = 0,
                        VAT = 0,
                        payed = item.payed,
                        item.drinks.map((item2: any) => (
                            itemsCount++,
                            totalPrice = item.price,
                            VAT = item.vat,
                            <div className='item-container2'>
                                <IonAvatar className='item-item2' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    <img src={item2.image} alt={item2.title + " img"} />
                                </IonAvatar>
                                <IonText className='item-item2' color={"favorite-black"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{item2.title}</IonText>
                            </div>
                        ))
                    ))}
                    <div className='info-container'>
                        <IonLabel className='info-container-item' color={"favorite-black"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Stevilo izdelkov</IonLabel>
                        <IonLabel className='info-container-item' color={"favorite-black"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{itemsCount}</IonLabel>
                        <IonLabel className='info-container-item' color={"favorite-black"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>DDV</IonLabel>
                        <IonLabel className='info-container-item' color={"favorite-black"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{VAT}€</IonLabel>
                        <IonLabel className='info-container-item' color={"favorite-black"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Plačano</IonLabel>
                        <IonLabel className='info-container-item' color={"favorite-black"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{payed.toString() === "true" ? "Da" : "Ne"}</IonLabel>
                        <IonLabel className='info-container-item-last' color={"favorite-black"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}><b>Skupaj</b></IonLabel>
                        <IonLabel className='info-container-item-last' color={"favorite-black"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}><b>{totalPrice.toFixed(2)}€</b></IonLabel>
                    </div>

                    <div className='buttons-container-2'>
                        <IonButton className='buttons-container-item' color={"favorite-button-pay"} onClick={() => { window.location.assign("/invoice/" + param.id); }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}><b>Račun</b></IonButton>
                    </div>
                </div>

            </IonContent>
        </IonPage >
    )
}

export default OrderInfo;