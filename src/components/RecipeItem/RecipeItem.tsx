import {
  IonLabel,
  IonImg,
  IonIcon,
  IonChip,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';
import './RecipeItem.css';
import { IRecipeFields } from '../../@types/generated/contentful';
import { timeOutline, leafOutline, restaurantOutline } from 'ionicons/icons';

interface Props {
  data: IRecipeFields;
  id: string;
}

const RecipeItem: React.FC<Props> = (props) => {
  const { category, duration, image, title, vegetarian } = props.data;

  return (
    <IonCard className='ri' routerLink={`recipe/${props.id}`}>
      <div className='img-container'>
        {image ? (
          <IonImg alt={image.fields.file.fileName} src={image.fields.file.url} />
        ) : (
          <IonImg alt='placeholder image' src={'./assets/placeholder.png'} />
        )}
        {vegetarian && <IonIcon size='small' icon={leafOutline} />}
      </div>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <section className='badges'>
        <IonChip color='primary'>
          <IonIcon icon={timeOutline}></IonIcon>
          <IonLabel>{duration}</IonLabel>
        </IonChip>
        <IonChip color='primary'>
          <IonIcon icon={restaurantOutline}></IonIcon>
          <IonLabel>{category}</IonLabel>
        </IonChip>
      </section>
    </IonCard>
  );
};

export default RecipeItem;
