import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { filterOutline, closeCircleOutline } from 'ionicons/icons';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { IFilterList } from '../../pages/Home/Home';
import './Filter.css';

interface Props {
  setFilterList: Dispatch<SetStateAction<IFilterList[]>>;
}

const filterList: IFilterList[] = [
  { val: 'Vegetarisch', isChecked: false },
  { val: 'Nudeln', isChecked: false },
  { val: 'Kartoffeln', isChecked: false },
  { val: 'Reis', isChecked: false },
  { val: 'Sonstiges', isChecked: false },
];

const Filter: React.FC<Props> = (props) => {
  const { setFilterList } = props;
  const [showModal, setShowModal] = useState(false);
  const [filterModal, setFilterModal] = useState(filterList);

  const handleOnChange = (position: number) => {
    let updatedState = [...filterModal];
    updatedState[position].isChecked = !updatedState[position].isChecked;
    setFilterModal(updatedState);
  };

  useEffect(() => {
    document.addEventListener('ionBackdropTap', () => {
      setShowModal(false);
    });
  }, []);

  useEffect(() => {
    if (!showModal) {
      setFilterList(filterModal);
    }
  }, [showModal, filterModal, setFilterList]);

  return (
    <>
      <IonFab onClick={() => setShowModal(true)} vertical='bottom' horizontal='end' slot='fixed'>
        <IonFabButton id='filer-modal-trigger'>
          <IonIcon icon={filterOutline} />
        </IonFabButton>
      </IonFab>
      <IonModal showBackdrop={true} isOpen={showModal} initialBreakpoint={0.4}>
        <IonHeader>
          <IonToolbar color='primary'>
            <IonTitle>Rezeptfilter</IonTitle>
            <IonButtons slot='end'>
              <IonButton onClick={() => setShowModal(false)}>Fertig</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent scrollY={false} className='ion-padding'>
          <IonList>
            {filterModal.map(({ val }, index) => {
              return (
                <IonItem key={index}>
                  <IonLabel>{val}</IonLabel>
                  <IonCheckbox
                    slot='end'
                    value={val}
                    checked={filterModal[index].isChecked}
                    onIonChange={() => handleOnChange(index)}
                  />
                </IonItem>
              );
            })}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default Filter;
