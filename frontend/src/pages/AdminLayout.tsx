import Footer from "../components/Footer"
import LineChart from "../components/LineChart"
import NewCustomers from "../components/NewCustomers"
import TotalOrders from "../components/TotalOrders"
import TotalSales from "../components/TotalSales"
import BarChart from "../components/BarChart"
import RecentOrders from "../components/RecentOrders"


function AdminLayout() {

  const groupedBarData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Product A',
        data: [4000, 3000, 5000, 7000],
        backgroundColor: 'rgba(0, 0, 255, 0.7)',
        borderColor: 'rgb(0, 0, 255)',
        borderWidth: 1,
      },
      {
        label: 'Product B',
        data: [3000, 4000, 4500, 6000],
        backgroundColor: 'rgba(0, 0, 255, 0.7)',
        borderColor: 'rgb(0, 0, 255)',
        borderWidth: 1,
      },
      {
        label: 'Product C',
        data: [2000, 3500, 3000, 4500],
        backgroundColor: 'rgba(0, 0, 255, 0.7)',
        borderColor: 'rgb(0, 0, 255)',
        borderWidth: 1,
      }
    ],
  };



  return (
    <div className="pt-20">

        <div className="container max-sm:px-2 max-md:px-5 max-lg:px-5 max-xl:px-10 max-2xl:px-20 my-20 mx-auto">
            <div className="flex max-md:flex-wrap gap-6">
                <TotalSales/>
                <TotalOrders/>
                <NewCustomers/>
            </div>

            <div className="flex flex-col gap-10 mt-10">
              <LineChart/>
              <BarChart data={groupedBarData}/>
            </div>
            
            <div>
              <RecentOrders/>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default AdminLayout