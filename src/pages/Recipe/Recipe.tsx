import {
  IonList,
  IonItem,
  IonLabel,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './Recipe.css';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

const Recipe: React.FC<Props> = ({ match }) => {
  const [recipeId, setRecipeId] = useState(match.params.id);
  useEffect(() => {
    console.log(recipeId);
  }, [recipeId]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonLabel>Pokémon Yellow {recipeId}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default Recipe;
