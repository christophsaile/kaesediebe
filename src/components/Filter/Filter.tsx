import {
  IonBackdrop,
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonModal,
  IonSegment,
  IonSegmentButton,
  IonToggle,
  ToggleChangeEventDetail,
} from '@ionic/react';
import { filterOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';

interface Props {}

const Filter: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string[]>([]);

  useEffect(() => {
    document.addEventListener('ionBackdropTap', () => {
      setShowModal(false);
    });
  }, []);

  useEffect(() => {
    if (!showModal) {
      console.log(activeFilter);
    }
  }, [showModal]);

  const checkIfFilterIsActive = (e: CustomEvent<ToggleChangeEventDetail<any>>) => {
    const value = e.detail.value;
    if (activeFilter.includes(value)) {
      setActiveFilter(activeFilter.filter((item) => item !== value));
    } else {
      setActiveFilter((prevState) => [...prevState, value]);
    }
  };

  return (
    <>
      <IonFab onClick={() => setShowModal(true)} vertical='bottom' horizontal='end' slot='fixed'>
        <IonFabButton id='filer-modal-trigger'>
          <IonIcon icon={filterOutline} />
        </IonFabButton>
      </IonFab>
      <IonModal showBackdrop={true} isOpen={showModal} initialBreakpoint={0.5}>
        <IonContent scrollY={false} className='ion-padding'>
          <IonList>
            <IonItemDivider>Vegetarisch</IonItemDivider>
            <IonItem>
              <IonLabel>Checked: </IonLabel>
              <IonToggle value={'veggi'} onIonChange={(e) => checkIfFilterIsActive(e)} />
            </IonItem>
            <IonItem>
              <IonLabel>Checked: </IonLabel>
              <IonToggle value={'nudeln'} onIonChange={(e) => checkIfFilterIsActive(e)} />
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default Filter;
