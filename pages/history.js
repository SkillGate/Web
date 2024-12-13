import Closed from "../components/history/Closed";
import Opened from "../components/history/Opened";


const History = () => {
  return (
    <div>
      <div className="flex-center-between">
        <h1 className="text-xl font-bold">Job History</h1>
        
      </div>
      <div className="mt-5 flex flex-wrap gap-8">
        {/* <div className="flex-1 basis-[16rem]">
          <Applied />
        </div>
        <div className="flex-1 basis-[16rem]">
          <Saved />
        </div> */}
        <div className="flex-1 basis-[16rem]">
          <Opened />
        </div>
        <div className="flex-1 basis-[16rem]">
          <Closed />
        </div>
      </div>
    </div>
  );
};

export default History;
