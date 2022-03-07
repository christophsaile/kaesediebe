import {
  IonContent,
  IonPage,
  IonImg,
  IonLabel,
  IonIcon,
  IonChip,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonFab,
  IonFabButton,
  IonCardContent,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './Recipe.css';
import { IRecipeFields } from '../../@types/generated/contentful';
import { ContentfulClientApi } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { leafOutline, timeOutline, restaurantOutline, chevronBackOutline } from 'ionicons/icons';
import IngredientList from '../../components/IngredientList/IngredientList';
import ShareButton from '../../components/ShareButton/ShareButton';

interface IProps
  extends RouteComponentProps<{
    id: string;
  }> {
  client: ContentfulClientApi;
}

const Recipe: React.FC<IProps> = (props) => {
  const { match, client } = props;
  const [recipeId] = useState(match.params.id);
  const [recipeDetails, setRecipeDetails] = useState<IRecipeFields>();

  useEffect(() => {
    client
      .getEntry(recipeId)
      .then((entry: any) => {
        setRecipeDetails(entry.fields);
      })
      .catch(console.error);
  }, [recipeId, client]);

  return (
    <IonPage className='recipe'>
      <IonContent className='ion-padding fade' fullscreen>
        <IonCard>
          <div className='img-container'>
            {recipeDetails?.image ? (
              <IonImg
                alt={recipeDetails?.image?.fields.file.fileName}
                src={recipeDetails?.image?.fields.file.url}
              />
            ) : (
              <IonImg src={'./assets/placeholder.png'} />
            )}
            {recipeDetails?.vegetarian && <IonIcon icon={leafOutline} />}
          </div>
          <IonCardHeader>
            <IonCardTitle>{recipeDetails?.title}</IonCardTitle>
            <section className='badges'>
              <IonChip color='primary'>
                <IonIcon icon={timeOutline}></IonIcon>
                <IonLabel>{recipeDetails?.duration}</IonLabel>
              </IonChip>
              <IonChip color='primary'>
                <IonIcon icon={restaurantOutline}></IonIcon>
                <IonLabel>{recipeDetails?.category}</IonLabel>
              </IonChip>
            </section>
          </IonCardHeader>
          <IonCardContent>
            <IngredientList client={client} recipeDetails={recipeDetails} />
            {recipeDetails?.description ? (
              <>
                <IonCardTitle class='ion-padding-top'>Zubereitung</IonCardTitle>
                {documentToReactComponents(recipeDetails.description)}
              </>
            ) : (
              ''
            )}
          </IonCardContent>
        </IonCard>
        <IonFab vertical='bottom' horizontal='start' slot='fixed'>
          <IonFabButton routerDirection='back' routerLink='/home' id='filer-modal-trigger'>
            <IonIcon icon={chevronBackOutline} />
          </IonFabButton>
        </IonFab>
        <ShareButton id={recipeId} recipe={recipeDetails} />
      </IonContent>
    </IonPage>
  );
};
export default Recipe;
