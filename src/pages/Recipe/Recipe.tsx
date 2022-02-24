import {
  IonContent,
  IonPage,
  IonFooter,
  IonButtons,
  IonBackButton,
  IonToolbar,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonChip,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './Recipe.css';
import { IIngredientFields, IRecipeFields } from '../../@types/generated/contentful';
import { ContentfulClientApi } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { leafOutline, timeOutline, restaurantOutline } from 'ionicons/icons';
import IngredientList from '../../components/IngredientList/IngredientList';

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
    <IonPage>
      <IonContent className='ion-padding' fullscreen>
        <IonImg
          className='recipe-img'
          alt={recipeDetails?.image?.fields.file.fileName}
          src={recipeDetails?.image?.fields.file.url}
        />
        <h1>
          {recipeDetails?.title}
          <IonIcon
            className='veggi-icon'
            icon={recipeDetails?.vegetarian ? leafOutline : ''}
          ></IonIcon>
        </h1>
        <IonRow>
          <IonChip outline color='primary'>
            <IonIcon icon={timeOutline}></IonIcon>
            <IonLabel>{recipeDetails?.duration}</IonLabel>
          </IonChip>
          <IonChip outline color='primary'>
            <IonIcon icon={restaurantOutline}></IonIcon>
            <IonLabel>{recipeDetails?.category}</IonLabel>
          </IonChip>
        </IonRow>
        <IngredientList client={client} recipeDetails={recipeDetails} />
        {recipeDetails?.description ? (
          <IonGrid>
            <h2>Zubereitung</h2>
            {documentToReactComponents(recipeDetails.description)}
          </IonGrid>
        ) : (
          ''
        )}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton default-href='\' color='primary' />
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
export default Recipe;
