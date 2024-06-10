import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonLabel, IonIcon, IonFabList, IonItem } from '@ionic/react';
import BackButton from '../components/BackButton';
import { personCircleOutline, arrowForwardOutline, logOutOutline } from 'ionicons/icons';
import { logOut } from '../firebaseConfig';

import '../styles/UserInfo.css'
import { useEffect, useState } from 'react';
import { get, getDatabase, ref } from 'firebase/database';
import { userInfo } from 'os';
import { Link } from 'react-router-dom';

const UserInfo: React.FC = () => {
  const [orders, setorders] = useState<any[]>([])
  const user = JSON.parse(localStorage.getItem("user") || "")

  function GetOrders() {
    var data: any = []
    var filteredUserOrders: any = []
    const db = getDatabase()

    get(ref(db, '/Orders')).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          data.push(childData)
        });
        data.map((order: any) => {
          if (order.user_uid === user.uid) {
            filteredUserOrders.push(order)
          }
        })
        setorders(filteredUserOrders)
      }
      else {
        console.warn("No data available");
      }
    })
  }

  useEffect(() => {
    GetOrders()
  }, [])


  return (
    <IonPage placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <IonHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <IonToolbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <BackButton path={"home"}></BackButton>
          <IonTitle placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Uporabnik</IonTitle>
          <IonIcon icon={logOutOutline} size="large" style={{ paddingRight: "10px" }} slot="end" onClick={() => { logOut(); }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon>
        </IonToolbar>
      </IonHeader>
      <IonContent placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className='user-container'>
          <div className='user-item'>
            <IonIcon icon={personCircleOutline} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon>
            <div>
              <IonText placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}><b>{user.email}</b></IonText>
            </div>
          </div>
          <div className='user-item'>
            <div className='finished-orders'>
              <IonLabel placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Oddana naročila</IonLabel>
            </div>
            <div className='user-info-container'>
              {orders.length !== 0 ? orders?.map((order: any) => (
                <>
                  <IonLabel className='user-info-container-item' color={"favorite-black"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{order.date}</IonLabel>
                  <div className='user-info-container-item-arrow'>
                    <IonLabel color={"favorite-black"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      <Link to={`/order-info/${order.order_uuid}`} color={"favorite-black"}>
                        <IonIcon icon={arrowForwardOutline} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}></IonIcon>
                      </Link>
                    </IonLabel>
                  </div>
                </>
              ))
                : <></>
              }
            </div>
          </div>
          <div className='user-item'>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserInfo;
