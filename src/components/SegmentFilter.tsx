import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';

function SegmentFilter() {
    return (
        <>
            <IonSegment value="" color={"dark"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <IonSegmentButton value="kave" onClick={() => { }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonLabel placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Kave</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="brez-alk-pijace" onClick={() => { }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonLabel placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Brez alk. pijače</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="vina" onClick={() => { }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonLabel placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Vina</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="caji" onClick={() => { }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <IonLabel placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Čaji</IonLabel>
                </IonSegmentButton>
            </IonSegment>
        </>
    );
}
export default SegmentFilter;