module.exports = survey => {
  return `
     <html>
      <body>
        <div style="font-family:Arial;align-items:center;justify-content:center;">
          <h3 style="font-size:12px;text-align:center;">I'd like your input!</h3>
          <p style="font-size:12px;text-align:center;">please answer the following question: </p>
          <p style="font-size:20px;text-align:center;">${survey.body}</p>
          <div>
            <a style="width:56px;padding:8px;border-radius:4px;text-decoration:none;color:black;background:rgb(120,250,120);text-align:center;" href="http://localhost:3000">Yes</a>
            <a style="width:56px;padding:8px;border-radius:4px;text-decoration:none;color:black;background:rgb(250,120,120);text-align:center;" href="http://localhost:3000">No</a>
          </div>
        </div>
      </body>
    </html>  
  `;
};
