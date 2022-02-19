import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import './RecipeCard.css';

interface Props {
  data: any;
  id: string;
}

const RecipeCard: React.FC<Props> = (props) => {
  const { category, description, duration, image, title, vegetarian } = props.data;

  return (
    <IonCard routerLink={`recipe/${props.id}`}>
      {image && <img alt={image.fields.file.title} src={image.fields.file.url} />}
      <IonCardHeader>
        <IonCardSubtitle>
          {category}, {duration}, {vegetarian && 'veggi'}
        </IonCardSubtitle>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{description}</IonCardContent>
    </IonCard>
  );
};

export default RecipeCard;
