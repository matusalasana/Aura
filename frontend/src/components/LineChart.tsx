import Charts from "./Charts";



function LineChart() {

    const dateOfSales = new Date().getFullYear().toString();
    
      const basicData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: `Sales Analytics ${dateOfSales}`,
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
          },
        ],
      };

  return (
    <div>
        <Charts data={basicData}/>
    </div>
  )
}

export default LineChart