import {
  IonContent,
  IonHeader,
  IonPage,
  IonList,
  IonImg,
  IonFooter,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { IRecipeFields } from '../../@types/generated/contentful';
import { ContentfulClientApi, Entry } from 'contentful';
import RecipeItem from '../../components/RecipeItem/RecipeItem';
import './Home.css';
import Filter from '../../components/Filter/Filter';

interface IProps {
  client: ContentfulClientApi;
}

export interface IFilterList {
  val: string;
  isChecked: boolean;
}

const Home: React.FC<IProps> = (props) => {
  const [recipies, setRecipies] = useState<Entry<IRecipeFields>[]>();
  const [filters, setFilters] = useState<IFilterList[]>([]);

  useEffect(() => {
    const fetchRecipes = (filter?: IFilterList[]) => {
      const isVeggi = filter?.find((elem) => elem.val === 'Vegetarisch');
      const isCategory = filter?.filter(
        (elem) => elem.val !== 'Vegetarisch' && elem.isChecked === true
      );
      let categoryList: string[] = [];
      isCategory?.forEach((elem) => {
        categoryList.push(elem.val);
      });
      const allCategories = 'Nudeln,Reis,Kartoffeln,Sonstiges';

      props.client
        .getEntries<IRecipeFields>({
          content_type: 'recipe',
          'fields.category[in]': categoryList[0] ? categoryList.join() : allCategories,
          'fields.vegetarian[in]': isVeggi?.isChecked ? 'true' : 'true,false',
        })
        .then((entries) => {
          setRecipies(entries.items);
        })
        .catch(console.error);
    };

    if (filters[0]) {
      fetchRecipes(filters);
    }
  }, [filters, props.client]);

  return (
    <IonPage className='home'>
      <IonContent className='fade' fullscreen>
        <IonHeader className='ion-no-border ion-padding'>
          <IonImg alt='logo' src='/assets/icon/icon_transparent.png' />
        </IonHeader>
        <IonList>
          {recipies?.map((item) => {
            return <RecipeItem data={item.fields} id={item.sys.id} key={item.sys.id} />;
          })}
        </IonList>
        <Filter setFilterList={setFilters} />
        <IonFooter className='ion-no-border'>
          <IonToolbar color='light'>
            <IonTitle size='small'>🧀 made by Chris & Pauline</IonTitle>
          </IonToolbar>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default Home;
