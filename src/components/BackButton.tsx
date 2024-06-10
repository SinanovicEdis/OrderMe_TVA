import { IonBackButton, IonButtons } from "@ionic/react";

interface Props { path: String }

const BackButton: React.FC<Props> = (path) => {
    return (
        <IonButtons slot="start" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IonBackButton defaultHref={path.path.toString()} />
        </IonButtons>
    );
};

export default BackButton;