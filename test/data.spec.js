describe('data', () => {

  it('debería exponer función computeStudentsStats en objeto global', () => {
    assert.isFunction(data.computeStudentsStats);
  });

  it('debería exponer función computeGenerationsStats en objeto global', () => {
    assert.isFunction(data.computeGenerationsStats);
  });

  it('debería exponer función sortStudents en objeto global', () => {
    assert.isFunction(data.sortStudents);
  });

  it('debería exponer función filterStudents en objeto global', () => {
    assert.isFunction(data.filterStudents);
  });

  describe('computeStudentsStats(laboratoria)', () => {

    //sconst { laboratoria } = fixtures;

    it('debería retornar arreglo de students con propiedad campus y propiedad generation', () => {
      const processed = data.computeStudentsStats(fixtures);
      
      processed.forEach((student) => {
        assert.ok(student.hasOwnProperty('campus'));
        assert.ok(student.hasOwnProperty('generation'));
      });
    });

    it('debería retornar arreglo de students con propiedad stats', () => {
      const processed = data.computeStudentsStats(fixtures);
    
      processed.forEach( (student, i) => {
        assert.ok(student.hasOwnProperty('stats'));
        assert.isNumber(student.stats.completedPercentage);
        assert.isObject(student.stats.topics);
        assert.isNumber(student.stats.topics["01-Introduccion-a-programacion"].completedPercentage);
        assert.isNumber(student.stats.topics["01-Introduccion-a-programacion"].percentageDuration);
        assert.isObject(student.stats.topics["01-Introduccion-a-programacion"].subtopics);
        assert.isNumber(student.stats.topics["01-Introduccion-a-programacion"].subtopics["00-bienvenida-orientacion"].completedPercentage);
        assert.isString(student.stats.topics["01-Introduccion-a-programacion"].subtopics["00-bienvenida-orientacion"].type);
        assert.isNumber(student.stats.topics["01-Introduccion-a-programacion"].subtopics["00-bienvenida-orientacion"].duration);
        });
    });

    describe('student.stats para el primer usuario en data de prueba - ver carpeta data/', () => {
      const processed = data.computeStudentsStats(fixtures);
      it('debería tener propiedad completedPercentage con valor 89', () => {       
        assert.equal(processed[0].stats.completedPercentage, 89);
      });

      it('debería tener propiedad completedPercentage dentro de propiedad topics con valor 80', () => {
        assert.equal(processed[0].stats.topics['01-Introduccion-a-programacion'].completedPercentage, 80);
      });
      it('debería tener propiedad percentageDuration dentro de propiedad topics con valor 79', () => {
        assert.equal(processed[0].stats.topics['01-Introduccion-a-programacion'].percentageDuration, 79)
      });

      it(`debería tener propiedad subtopics que es un objeto con primera key "00-bienvenida-orientacion" con valor 
      {completado: 1, duracionSubtema: 30, tipo: "lectura"}`, () => {
        const topics = Object.keys(processed[0].stats.topics);
        const subTopics = Object.keys(processed[0].stats.topics[topics[0]].subtopics);
          assert.deepEqual(processed[0].stats.topics[topics[0]].subtopics[subTopics[0]], {
            completedPercentage: 100,
            type: "lectura",
            duration: 30
          });
      });
    });
  });

  describe('computeGenerationsStats(laboratoria)', () => {
    const { laboratoria } = fixtures;
    
    const processed = data.computeGenerationsStats(fixtures);
  
    it('debería retornar un arreglo de generaciones con propiedad average y count', () => {
      processed.forEach((generation) => {
        assert.ok(generation.hasOwnProperty('average'));
        assert.ok(generation.hasOwnProperty('count'));
      })
    });
    
    describe('generation para la primera generación en data de prueba - ver carpeta data/', () => {
      const processed = data.computeGenerationsStats(fixtures);

      it('debería tener una propiedad average con valor 75', () => {
        assert.equal(processed[0].average, 75);
      });

      it('debería tener una propiedad count con valor 15', () => {
        assert.equal(processed[0].count, 15);
      });

    }); 
  });

  describe('filterStudents(users, search)', () => {
    const processed = data.filterStudents(data.computeStudentsStats(fixtures),"Cari Candyce");
    it('debería retornar nuevo arreglo solo el nombre de Cari Candyce',() =>{
      assert.equal(processed.length, 2);
    });

  });
  
  describe('sortStudents(students, orderBy, orderDirection)', () => {
    const processedASC = data.sortStudents(data.computeStudentsStats(fixtures),"name", "ASC");
    const processedDESC = data.sortStudents(data.computeStudentsStats(fixtures),"name", "DESC");
    const processedpercentageASC = data.sortStudents(data.computeStudentsStats(fixtures),"percentage", "ASC");
    const processedpercentageDESC = data.sortStudents(data.computeStudentsStats(fixtures),"percentage", "DESC");
    
    it('debería retornar arreglo de estudiantes ordenado por nombre ASC', ()=>{
      assert.equal(processedASC[0].name, "Aaliyah Lessie");
      assert.equal(processedASC[133].name, "Yolanda Zula");
    });
    it('debería retornar arreglo de estudiantes ordenado por nombre DESC', () =>{
      assert.equal(processedDESC[0].name, "Yolanda Zula");
      assert.equal(processedDESC[133].name, "Aaliyah Lessie");
    });
    it('debería retornar arreglo de estudiantes ordenado por porcentaje general ASC', () =>{
      assert.equal(processedpercentageASC[0].name, "Vicki Annice");
      assert.equal(processedpercentageASC[133].name, "Rachael Cate");
    });
    it('debería retornar arreglo de estudiantes ordenado por porcentaje general DESC',() =>{
      assert.equal(processedpercentageDESC[0].name, "Rachael Cate");
      assert.equal(processedpercentageDESC[133].name, "Vicki Annice");
    });
  });
});