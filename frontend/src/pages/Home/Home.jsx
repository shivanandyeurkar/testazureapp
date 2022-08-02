import React from 'react';
import { useSelector } from 'react-redux';

import AppLayout from '../../containers/layout/AppLayout';
import ProjectDetailsForm from '../../components/ProjectDetailsForm/ProjectDetailsForm';
import ProductsForm from '../../components/ProductsForm/ProductsForm';
import './Home.scss';

const Home = () => {
  const formData = useSelector(state => state.form);
  const showProductsForm =
    formData.projectName && formData.spec && formData.location && formData.city;

  // const collapseAllDropDown = event => {
  //   const selectorElement = event.target.closest('.drop-down__selection-container');

  //   if (!selectorElement) {
  //     setJobSpec(false);
  //     setProjectLocation(false);
  //     setCity(false);
  //   } else {
  //     switch (selectorElement.getAttribute('data-id')) {
  //       case 'Job Spec':
  //         setProjectLocation(false);
  //         setCity(false);
  //         break;
  //       case 'Project Location':
  //         setJobSpec(false);
  //         setCity(false);
  //         break;
  //       case 'City':
  //         setJobSpec(false);
  //         setProjectLocation(false);
  //         break;
  //     }
  //   }
  // };

  // useEffect(() => {
  //   document.body.addEventListener('click', collapseAllDropDown);
  //   return () => {
  //     window.removeEventListener('click', collapseAllDropDown);
  //   };
  // }, []);

  return (
    <AppLayout>
      <div className="home">
        <ProjectDetailsForm />

        {showProductsForm && <ProductsForm jobSpec={formData.spec} />}
      </div>
    </AppLayout>
  );
};

export default Home;
