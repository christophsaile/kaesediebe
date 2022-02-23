import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList } from '@ionic/react';
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
    const { client } = props;
    client
      .getEntries<IRecipeFields>({
        content_type: 'recipe',
      })
      .then((entries) => {
        setRecipies(entries.items);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    console.log('new Filter State', filters);
  }, [filters]);

  return (
    <IonPage>
      <IonHeader collapse='condense'>
        <IonToolbar>
          <IonTitle size='large'>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding' fullscreen>
        <IonList>
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
