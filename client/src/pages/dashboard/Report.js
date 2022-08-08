import React, { useEffect } from 'react'
import ReportForm from '../../components/ReportForm';
import { useAppContext } from '../../context/appContext';

const Report = () => {
  const { getFinancialDetail } = useAppContext();
  
  useEffect(() => {
    const getFinancialReport = async () => { 
      await getFinancialDetail()
    }
    getFinancialReport();
  }, [])

  return (
    <div>
      <h3>Financial Details</h3>
      <ReportForm />
    </div>
  );
}

export default Report