import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { IonLabel, IonContent, IonHeader, IonPage, IonAvatar, IonToolbar, IonText, IonTitle, IonIcon, IonButton, IonItem } from '@ionic/react';
import { get, getDatabase, ref } from "firebase/database";
import BackButton from "../components/BackButton";
import '../styles/Invoice.css'
import QRCode from "react-qr-code";

interface Order {
    drinks: []
    order_uuid: string
    price: number
    state: string
    user: string
    user_uuid: string
    date: String
    vat: String
}

function generatePDF() {
}

const Invoice: React.FC = () => {
    const [order, setorder] = useState<Order>()
    var data = useParams()
    var param = JSON.parse(JSON.stringify(data))

    function getOrder() {
        const db = getDatabase()
        var data: any = []

        get(ref(db, '/Orders')).then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();
                    data.push(childData)
                });
                data.map((order: any) => {
                    if (order.order_uuid === param.id) {
                        setorder(order)
                    }
                })
            }
            else {
                console.warn("No data available");
            }
        })
    }

    useEffect(() => {
        getOrder()
    }, [])


    return (
        <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IonHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonToolbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <BackButton path={"/order-info/" + param.id} />
                    <IonTitle placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Račun</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div style={{ backgroundColor: "white", margin: "10px", color: "black", borderRadius: "20px" }}>
                    <div className="header-container">
                        <div className="header-item">
                            <p>Podjetje ABC</p>
                            <p>Ulica borcev 10</p>
                            <p>1000 Ljubljana</p>
                            <p>ID za DDV: 123123123</p>
                        </div>
                    </div>

                    <div className="header-item-info">
                        <p><b>RAČUN ŠT {param.id}</b></p>
                        <p>{order?.date}</p>
                    </div>

                    <div className="invoice-order-container">
                        <div className="invoice-order-item-title">
                            <b>Naziv</b>
                        </div>
                        <div className="invoice-order-item-title">
                            <b>Cena</b>
                        </div>
                        <div className="invoice-order-item-title">
                            <b>Količina</b>
                        </div>
                        <div className="invoice-order-item-title">
                            <b>Znesek</b>
                        </div>
                    </div>
                    <div className="invoice-order-container">
                        {
                            order?.drinks.map((item: any) => (
                                <>
                                    <div className="invoice-order-item">
                                        {item.title}
                                    </div>
                                    <div className="invoice-order-item">
                                        {item.price}
                                    </div>
                                    <div className="invoice-order-item">
                                        1
                                    </div>
                                    <div className="invoice-order-item">
                                        {item.price}
                                    </div>
                                </>
                            ))}

                        <div className="invoice-order-item" style={{ borderTop: "1px dotted black" }}>Skupaj</div>
                        <div className="invoice-order-item" style={{ borderTop: "1px dotted black" }}></div>
                        <div className="invoice-order-item" style={{ borderTop: "1px dotted black" }}></div>
                        <div className="invoice-order-item" style={{ borderTop: "1px dotted black" }}>{order?.price}</div>
                    </div>

                    <div className="invoice-info-container">
                        <div className="invoice-info-item"><b>ZOI: </b>abcdefghijklmnopqrstuvwxyz</div>
                        <div className="invoice-info-item"><b>EOR: </b>{param.id}</div>
                    </div>

                    <div className="qr-code-container">
                        <QRCode
                            style={{ width: "50%" }}
                            value={""}
                        />
                    </div>
                </div>
            </IonContent>
        </IonPage >
    )
}

export default Invoice