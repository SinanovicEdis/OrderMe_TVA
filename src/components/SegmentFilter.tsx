import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';

function SegmentFilter() {
    return (
        <>
            <IonSegment value="" color={"dark"}>
                <IonSegmentButton value="kave" onClick={() => { }}>
                    <IonLabel>Kave</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="brez-alk-pijace" onClick={() => { }}>
                    <IonLabel>Brez alk. pijače</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="vina" onClick={() => { }}>
                    <IonLabel>Vina</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="caji" onClick={() => { }}>
                    <IonLabel>Čaji</IonLabel>
                </IonSegmentButton>
            </IonSegment>
        </>
    );
}
export default SegmentFilter;