import React from 'react';

function FacebookGraph(props) {

    function convertDateTime(created_time){

      const humanReadableDate = new Date(created_time).toLocaleDateString(
        "en-US",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit"
        }
      );
        return humanReadableDate;
    }
  return (
    <div className="container my-5">
      <div className="card p-5 shadow">
        <h1>Facebook API</h1>
        {props.items.length > 0 ? (
          <table className="table table-strip">
            <thead>
              <tr>
                <th>#</th>
                <th>Message</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {props.items.slice(0, 10).map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.message}</td>
                  <td>{convertDateTime(item.created_time)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Data Fetched.</p>
        )}
      </div>
    </div>
  );
}



export default FacebookGraph