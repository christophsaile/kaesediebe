import {
  IonLabel,
  IonImg,
  IonGrid,
  IonRow,
  IonIcon,
  IonChip,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
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
    <IonCard routerLink={`recipe/${props.id}`}>
      {image && <IonImg alt={image.fields.file.fileName} src={image.fields.file.url} />}
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonGrid>
          <IonRow>
            <h2>{title}</h2>
            <IonIcon className='veggi-icon' icon={vegetarian ? leafOutline : ''}></IonIcon>
          </IonRow>
          <IonRow>
            <IonChip outline color='primary'>
              <IonIcon icon={timeOutline}></IonIcon>
              <IonLabel>{duration}</IonLabel>
            </IonChip>
            <IonChip outline color='primary'>
              <IonIcon icon={restaurantOutline}></IonIcon>
              <IonLabel>{category}</IonLabel>
            </IonChip>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default RecipeItem;
