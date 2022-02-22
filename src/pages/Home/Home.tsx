import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList } from '@ionic/react';
import { useEffect, useState } from 'react';
import { IRecipeFields } from '../../@types/generated/contentful';
import { ContentfulClientApi, Entry } from 'contentful';
import RecipeItem from '../../components/RecipeItem/RecipeItem';
import './Home.css';
import Filter from '../../components/Filter/Filter';

interface Props {
  client: ContentfulClientApi;
}

const Home: React.FC<Props> = (props) => {
  const [recipies, setRecipies] = useState<Entry<IRecipeFields>[]>();

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
        <Filter />
      </IonContent>
    </IonPage>
  );
};

export default Home;
