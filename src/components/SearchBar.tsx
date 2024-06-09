import React, { useEffect, useState } from 'react';
import { IonItem, IonList, IonSearchbar, IonContent } from '@ionic/react';
import { child, get, getDatabase, ref } from 'firebase/database';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel, IonIcon, IonBadge } from '@ionic/react';
import { addCircleOutline, heartOutline } from 'ionicons/icons';
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

function getData(): Array<[]> {
    try {
        var arr: any = []
        var dbRef = ref(getDatabase());

        get(child(dbRef, '/Drinks')).then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val()
                data.map((el: any) => {
                    arr.push(el)
                })
            }
            else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.warn(error.message);
        });
    } catch (e) {

    }

    return arr
}




const SearchBar = () => {
    const data = getData();
    let [results, setResults] = useState<string[]>([]);
    const [selectedItem, setSelectedItem] = useState<Artikel | undefined>(undefined)

    function addArticleToCart(uid_: string) {
        const article = data.filter((e: any) => e.uuid === uid_)
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

    const handleChange = (ev: Event) => {
        let query = "";
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();

        if (query !== "") {
            var arr: any[] = []
            data.map((element: any) => {
                if (element.title.toLowerCase().includes(query.toLowerCase())) {
                    arr.push({ title: element.title, uid: element.uuid })
                }
            })
            setResults(arr)
        }
        else if (query === "") {
            setResults([])
        }
    }

    function findItem(uid: string) {
        data.map((item: any) => {
            if (item.uuid === uid) {
                setSelectedItem(item)
            }
        })
    }

    return (
        <>
            <IonSearchbar color={"medium"} placeholder="Poišči pijačo" debounce={1000} onIonChange={(ev) => handleChange(ev)}></IonSearchbar>
            {results.length > 0 ? <IonList>
                {results.map((result: any) => (
                    <IonItem onClick={() => findItem(result.uid)}>{result.title}</IonItem>
                ))}
            </IonList> : <></>
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
        </>
    );
}
export default SearchBar;