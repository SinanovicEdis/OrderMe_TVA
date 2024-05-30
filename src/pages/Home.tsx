import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonImg, IonLabel, useIonAlert, IonItem } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSpinner, IonIcon, IonBadge } from '@ionic/react';
import { IonSegment, IonSegmentButton } from '@ionic/react';

import FloatingButton from '../components/FloatingButton';
import SearchBar from '../components/SearchBar';
import { addCircleOutline, heartOutline } from 'ionicons/icons';

import { getDatabase, ref, child, get } from "firebase/database";
import { IonRippleEffect } from '@ionic/react';
import axios from 'axios'

import '../styles/Home.css'
import '../styles/Menu.css'
import { useContext, useEffect, useState } from 'react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

interface Artikel {
  title: string;
  quantity: number
  description: string;
  ingredients: Array<string>;
  image: string;
  id: number
  uuid: string
  price: number
}

const Home: React.FC = () => {
  const [drinks, setDrinks] = useState<any>([])
  const [selectedItem, setSelectedItem] = useState<Artikel | undefined>(undefined)
  const [isLoaded, setisLoaded] = useState(false)
  const [filter, setfilter] = useState<any>()
  const [selectedSegment, setSelectedSegment] = useState<any>("")
  const user = JSON.parse(localStorage.getItem("user") || "")
  var userName = getUserName()
  const [presentAlert] = useIonAlert();

  const sendGetRequest = () => {
    return axios({
      url: "https://orderme-c0395-default-rtdb.europe-west1.firebasedatabase.app/Drinks.json/?auth=" + user.stsTokenManager.accessToken,
      method: 'get'
    }).then(response => {
      // console.log(response);
      setDrinks(response.data)
      setisLoaded(true)
      return response.data;
    })
  };

  function getUserName(): string {
    var email = user.email
    var result = email.slice(0, email.indexOf('@'));
    if (result.includes(".")) {
      result = result.slice(0, result.indexOf('.'))
    }

    result = result.toLowerCase()
    result = result.charAt(0).toUpperCase() + result.slice(1)

    return result
  }

  useEffect(() => {
    try {
      var dbRef = ref(getDatabase());
      if (drinks.length === 0) {
        get(child(dbRef, '/Drinks')).then((snapshot) => {
          if (snapshot.exists()) {
            var arr = snapshot.val()
            setDrinks(arr)
          }
          else {
            alert("No data available");
          }
        }).catch((error) => {
          alert(error.message);
        });
      }
      setisLoaded(true)
    } catch (e) {
      presentAlert({
        header: 'Napaka!',
        message: 'Prosim preverite pravilnost poskenirane QR kode',
        buttons: [{
          text: 'OK',
          role: 'confirm',
          handler: () => {
            window.location.assign("scan")
          },
        }],
      })
      setisLoaded(true)
    }
  }, [])

  function addArticleToCart(uid_: string) {
    const article = drinks.filter((e: any) => e.uuid === uid_)
    if (localStorage.getItem("cart")) {
      const articles = JSON.parse(localStorage.getItem("cart") || "")
      articles.push(article[0])
      localStorage.setItem("cart", JSON.stringify(articles))
    }
    else {
      localStorage.setItem("cart", JSON.stringify(article))
    }

    hapticsImpact()
  }

  const hapticsImpact = async () => {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  };

  function addArticleToFavorite(id: number) {
    const article = drinks.filter((e: any) => e.id === id)
    if (localStorage.getItem("favorite")) {
      const articles = JSON.parse(localStorage.getItem("cart") || "")
      articles.push(article[0])
      localStorage.setItem("favorite", JSON.stringify(articles))
    }
    else {
      localStorage.setItem("favorite", JSON.stringify(article))
    }
  }

  function selectFilter(name: string) {
    if (filter === null) {
      setfilter(name)
      setSelectedSegment(name)
    }
    else if (filter === name) {
      setfilter(null)
      setSelectedSegment(null)
    }
    else {
      setfilter(name)
      setSelectedSegment(name)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {selectedItem &&
            <>
              <IonTitle>{selectedItem.title}</IonTitle>
            </>
          }
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {!selectedItem &&
          <><div className='upper'>
            <div className='upper-item-fabBtn'>
              <FloatingButton slot='fixed' vertical='top' horizontal='start' edge={true} />
            </div>
            <div className='upper-item-text'>
              <IonText color={"favorite-black"}><IonText color={"favorite-name"}><b>{userName}</b></IonText>, <b>dobrodošel!</b></IonText>
            </div>
          </div>
            <div className='middle'>
              <SearchBar />

              <IonSegment value={selectedSegment} color={"primary"}>
                <IonSegmentButton value="coffee" onClick={() => { selectFilter("coffee") }}>
                  <IonLabel>Kave</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="non-alcoholic" onClick={() => { selectFilter("non-alcoholic") }}>
                  <IonLabel>Brez alk. pijače</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="wine" onClick={() => { selectFilter("wine") }}>
                  <IonLabel>Vina</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="tea" onClick={() => { selectFilter("tea") }}>
                  <IonLabel>Čaji</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </div><div className='menu'>
              {!filter &&
                drinks?.map((drink: any) => (
                  < div className='menu2' >
                    <IonText color={"favorite-black"}>{drink.title}</IonText>
                    <IonImg className='menu-item' src={drink.image} alt='' onClick={() => { setSelectedItem(drink); }} />

                    <div className="ion-activatable ripple-parent rounded-rectangle" onClick={() => addArticleToCart(drink.uuid)}>
                      <p style={{ color: "white" }}>Dodaj</p>
                      <IonRippleEffect>
                      </IonRippleEffect>
                    </div>
                  </div>
                ))}
              {filter &&
                drinks?.map((drink: any) => (
                  drink.category === filter ?
                    < div className='menu2' >
                      <IonText color={"favorite-black"}>{drink.title}</IonText>
                      <IonImg className='menu-item' src={drink.image} alt='' onClick={() => { setSelectedItem(drink); }} />

                      <div className="ion-activatable ripple-parent rounded-rectangle" onClick={() => addArticleToCart(drink.uuid)}>
                        <p style={{ color: "white" }}>Dodaj</p>
                        <IonRippleEffect>
                        </IonRippleEffect>
                      </div>
                    </div>
                    : <></>
                ))}
            </div>
          </>
        }
        {!isLoaded &&
          <>
            <IonItem>
              <IonSpinner name='dots' hidden={isLoaded}></IonSpinner>
            </IonItem>
          </>
        }
        {
          selectedItem &&
          <div className='item-card' onClick={() => setSelectedItem(undefined)}>
            <IonCard>
              <img src={selectedItem.image} alt="item img" />
              <IonCardHeader>
                <IonCardSubtitle color={'favorite-white'}>{selectedItem.title}</IonCardSubtitle>
                <IonCardTitle color={"favorite-white"}>{(selectedItem.price).toFixed(2)}€</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonLabel color={"medium"}>{selectedItem.description}</IonLabel>
              </IonCardContent>
              <IonCardTitle>
                <IonIcon icon={addCircleOutline} onClick={() => addArticleToCart(selectedItem.uuid)} size='large' color='favorite-white' style={{ padding: "10px" }}></IonIcon>
                <IonIcon icon={heartOutline} size='large' color='favorite-white' style={{ padding: "10px" }}></IonIcon>
              </IonCardTitle>
            </IonCard>
          </div>
        }
      </IonContent>
    </IonPage >
  );
};

export default Home;





