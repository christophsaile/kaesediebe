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
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './Recipe.css';
import { IIngredientFields, IRecipeFields } from '../../@types/generated/contentful';
import { ContentfulClientApi } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {
  client: ContentfulClientApi;
}
interface IIngredientUnsolved {
  amount: string;
  ingredientId: string;
}

interface IIngredientDissolved extends IIngredientFields {
  amount: string;
}

const Recipe: React.FC<Props> = (props) => {
  const { match, client } = props;
  const [recipeId] = useState(match.params.id);
  const [recipeDetails, setRecipeDetails] = useState<IRecipeFields>();
  const [ingredients, setIngredients] = useState<IIngredientDissolved[]>();

  useEffect(() => {
    client
      .getEntry(recipeId)
      .then((entry: any) => {
        setRecipeDetails(entry.fields);
      })
      .catch(console.error);
  }, [recipeId]);

  useEffect(() => {
    if (recipeDetails) {
      const getAllIngredientIds = recipeDetails.ingredients.map(
        (ingredient: IIngredientUnsolved) => {
          return ingredient.ingredientId;
        }
      );
      client
        .getEntries<IIngredientFields>({
          content_type: 'ingredient',
          'sys.id[in]': getAllIngredientIds.join(),
        })
        .then((entries) => {
          setIngredients(() =>
            recipeDetails.ingredients.map((ingredient: IIngredientUnsolved, index: number) => {
              return { amount: ingredient.amount, title: entries.items[index].fields.title };
            })
          );
        })
        .catch(console.error);
    }
  }, [recipeDetails]);

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
        <h2>Zutaten</h2>
        <IonList>
          {ingredients?.map((item, index) => (
            <IonItem key={index}>
              <IonLabel>
                <span>{item.amount}</span>
                <span>{item.title}</span>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        {recipeDetails?.description ? documentToReactComponents(recipeDetails.description) : ''}
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
