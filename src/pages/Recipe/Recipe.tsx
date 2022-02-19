import { IonCard, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import './Recipe.css';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

const Recipe: React.FC<Props> = ({ match }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Test {match.params.id}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard></IonCard>
      </IonContent>
    </IonPage>
  );
};
export default Recipe;
