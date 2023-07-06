import React, { useState } from "react";

const Index = () => {
  const [grades, setGrades] = useState([]);
  const [dataJson, setDataJson] = useState([]);

  const handleInputChange = (index, aspekIndex, event) => {
    const newGrades = [...grades];
    if (!newGrades[index]) {
      newGrades[index] = {};
    }
    newGrades[index][aspekIndex] = parseInt(event.target.value);
    setGrades(newGrades);
  };

  const handleSave = () => {
    const data = {};

    for (let i = 1; i <= 4; i++) {
      const aspekKey = `aspek_penilaian_${i}`;
      data[aspekKey] = {};

      grades.forEach((grade, index) => {
        const studentKey = `mahasiswa_${index + 1}`;
        const studentGrade = grade && grade[i] ? grade[i] : 0;
        data[aspekKey][studentKey] = studentGrade;
      });
    }
    const jsonString = JSON.stringify(data, null, 2);
    const cleanedString = jsonString.replace(/"mahasiswa_/g, "mahasiswa_");
    const lines = cleanedString.split("\n");
    const indentedLines = lines.map((line) => line.trim());
    setDataJson(indentedLines.join("\n"));
  };
  

  return (
    <div className="Container-fluid">
      <div className="Container">
        <h2 style={{ textAlign: "center", paddingTop:'2%', paddingBottom:'2%'}}>Penilaian Mahasiswa</h2>
        <div className="Container" style={{paddingLeft:'5%',paddingRight:'5%'}}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Mahasiswa</th>
                <th scope="col">Aspek Penilaian 1</th>
                <th scope="col">Aspek Penilaian 2</th>
                <th scope="col">Aspek Penilaian 3</th>
                <th scope="col">Aspek Penilaian 4</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index}>
                  <th scope="row">{`Mahasiswa_${index + 1}`}</th>
                  {[1, 2, 3, 4].map((aspekIndex) => (
                    <td key={aspekIndex}>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={grades[index]?.[aspekIndex] || ""}
                        onChange={(event) =>
                          handleInputChange(index, aspekIndex, event)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end me-5">
          <button className="" onClick={handleSave}>
            Simpan
          </button>
        </div>
      </div>
      {dataJson === null ? (
        <></>
      ) : (
        <div className="container-fluid">
          <pre>{dataJson}</pre>
        </div>
      )}
      <style>
        {`
          table {
            width: 100%;
            border-collapse: collapse;
          }
          
          th, td {
            padding: 8px;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

export default Index;
