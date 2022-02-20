import {
  IonContent,
  IonPage,
  IonFooter,
  IonButtons,
  IonBackButton,
  IonToolbar,
  IonImg,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './Recipe.css';
import { IRecipeFields } from '../../@types/generated/contentful';
import { ContentfulClientApi } from 'contentful';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {
  client: ContentfulClientApi;
}

const Recipe: React.FC<Props> = (props) => {
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
  }, [recipeId]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg
          alt={recipeDetails?.image?.fields.file.fileName}
          src={recipeDetails?.image?.fields.file.url}
        />
        <h1>{recipeDetails?.title}</h1>
        <div>
          <p>{recipeDetails?.category}</p>
          <p>{recipeDetails?.vegetarian}</p>
        </div>
        {/* <p>{recipeDetails?.ingredients}</p> */}
        {/* <p>{recipeDetails?.description}</p> */}
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
