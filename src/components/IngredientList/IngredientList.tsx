import { IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow } from '@ionic/react';
import { ContentfulClientApi } from 'contentful';
import { useEffect, useState } from 'react';
import { IIngredientFields, IRecipeFields } from '../../@types/generated/contentful';

interface IProps {
  client: ContentfulClientApi;
  recipeDetails?: IRecipeFields;
}

interface IIngredientDissolved extends IIngredientFields {
  amount: string;
}

interface IIngredientUnsolved {
  amount: string;
  ingredientId: string;
}

const IngredientList: React.FC<IProps> = (props) => {
  const [ingredients, setIngredients] = useState<IIngredientDissolved[]>();
  const { client, recipeDetails } = props;

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
            recipeDetails.ingredients.map((ingredient: IIngredientUnsolved) => {
              const itemName = entries.items.find(
                (items) => items.sys.id === ingredient.ingredientId
              );
              return { amount: ingredient.amount, title: itemName?.fields.title };
            })
          );
        })
        .catch(console.error);
    }
  }, [recipeDetails, client]);

  return (
    <>
      <h2>Zutaten</h2>
      <IonList>
        {ingredients?.map((item, index) => (
          <IonItem key={index}>
            <IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol size='4'>{item.amount}</IonCol>
                  <IonCol size='8'>{item.title}</IonCol>
                </IonRow>
              </IonGrid>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    </>
  );
};

export default IngredientList;
