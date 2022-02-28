import { IonContent, IonHeader, IonPage, IonList, IonImg } from '@ionic/react';
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
      const isVeggi = filter?.find((elem) => elem.val === 'Veggi');
      const isCategory = filter?.filter((elem) => elem.val !== 'Veggi' && elem.isChecked === true);
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
    <IonPage>
      <IonContent fullscreen>
        <IonHeader className='ion-no-border ion-padding'>
          <IonImg src='/assets/icon/icon_transparent.png' />
        </IonHeader>
        <IonList className='home-grid'>
          {recipies?.map((item) => {
            return <RecipeItem data={item.fields} id={item.sys.id} key={item.sys.id} />;
          })}
        </IonList>
        <Filter setFilterList={setFilters} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
