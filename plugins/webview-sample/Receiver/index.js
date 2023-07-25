const canvas = document.querySelector('#my_Canvas');
const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true }) || canvas.getContext('experimental-webgl', { preserveDrawingBuffer: true });

function sendImageData() {
   if (window.uxpHost) {
      const imageData = {
         "key": "imageDetails",
         "value": canvas.toDataURL()
      }
      window.uxpHost.postMessage(imageData);
   } else {
      console.log("window.uxpHost not supported");
   }
}

window.addEventListener("message", (e) => {
   const res = e.data;
   document.getElementById('rec').innerText = res;
   if (res === "createTriangle") {
      create2DTriangle();
   } else if (res === "transformTriangle") {
      transformTriangle();
   }
});

function sendCanvasDetails() {
   if (window.uxpHost) {
      const canvasData = {
         "key": "canvasDetails",
         "value": "\nWidth of Canvas: " + document.querySelector('#my_Canvas').width + "\n" + "Height of Canvas: " + document.querySelector('#my_Canvas').height
      }
      window.uxpHost.postMessage(canvasData);
   }
   else {
      console.log("window.uxpHost not supported");
   }
}

function create2DTriangle() {
   let vertices = [-0.5, 0.5, -0.5, -0.5, 0.0, -0.5,];
   const vertex_buffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
   gl.bindBuffer(gl.ARRAY_BUFFER, null);
   const vertCode =
      'attribute vec2 coordinates;' +
      'void main(void) {' + ' gl_Position = vec4(coordinates,0.0, 1.0);' + '}';
   const vertShader = gl.createShader(gl.VERTEX_SHADER);
   gl.shaderSource(vertShader, vertCode);
   gl.compileShader(vertShader);
   const fragCode = 'void main(void) {' + 'gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' + '}';
   const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
   gl.shaderSource(fragShader, fragCode);
   gl.compileShader(fragShader);
   const shaderProgram = gl.createProgram();
   gl.attachShader(shaderProgram, vertShader);
   gl.attachShader(shaderProgram, fragShader);
   gl.linkProgram(shaderProgram);
   gl.useProgram(shaderProgram);
   gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
   const coord = gl.getAttribLocation(shaderProgram, "coordinates");
   gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(coord);
   gl.clearColor(0.5, 0.5, 0.5, 0.9);
   gl.enable(gl.DEPTH_TEST);
   gl.clear(gl.COLOR_BUFFER_BIT);
   gl.viewport(0, 0, canvas.width, canvas.height);
   gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function transformTriangle() {
   let vertices = [-1, -1, -1, 1, -1, -1, 1, 1, -1];
   let colors = [1, 1, 1, 1, 1, 1, 1, 1, 1];
   let indices = [0, 1, 2];

   //Create and store data into vertex buffer
   const vertex_buffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

   //Create and store data into color buffer
   const color_buffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

   //Create and store data into index buffer
   const index_buffer = gl.createBuffer();
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

   /*==========================Shaders=========================*/
   const vertCode = 'attribute vec3 position;' +
      'uniform mat4 Pmatrix;' +
      'uniform mat4 Vmatrix;' +
      'uniform mat4 Mmatrix;' +
      'attribute vec3 color;' +//the color of the point
      'varying vec3 vColor;' +
      'void main(void) { ' +//pre-built function
      'gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);' +
      'vColor = color;' +
      '}';
   const fragCode = 'precision mediump float;' +
      'varying vec3 vColor;' +
      'void main(void) {' +
      'gl_FragColor = vec4(vColor, 1.);' +
      '}';
   const vertShader = gl.createShader(gl.VERTEX_SHADER);
   gl.shaderSource(vertShader, vertCode);
   gl.compileShader(vertShader);
   const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
   gl.shaderSource(fragShader, fragCode);
   gl.compileShader(fragShader);
   const shaderProgram = gl.createProgram();
   gl.attachShader(shaderProgram, vertShader);
   gl.attachShader(shaderProgram, fragShader);
   gl.linkProgram(shaderProgram);

   /*===========associating attributes to vertex shader ============*/
   const Pmatrix = gl.getUniformLocation(shaderProgram, "Pmatrix");
   const Vmatrix = gl.getUniformLocation(shaderProgram, "Vmatrix");
   const Mmatrix = gl.getUniformLocation(shaderProgram, "Mmatrix");
   gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
   let position = gl.getAttribLocation(shaderProgram, "position");
   gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0); //position
   gl.enableVertexAttribArray(position);
   gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
   let color = gl.getAttribLocation(shaderProgram, "color");
   gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0); //color
   gl.enableVertexAttribArray(color);
   gl.useProgram(shaderProgram);

   /*========================= MATRIX ========================= */
   function get_projection(angle, a, zMin, zMax) {
      const ang = Math.tan((angle * .5) * Math.PI / 180);
      return [
         0.5 / ang, 0, 0, 0,
         0, 0.5 * a / ang, 0, 0,
         0, 0, -(zMax + zMin) / (zMax - zMin), -1,
         0, 0, (-2 * zMax * zMin) / (zMax - zMin), 0
      ];
   }
   let proj_matrix = get_projection(40, canvas.width / canvas.height, 1, 100);
   let mov_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
   let view_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
   //translating z
   view_matrix[14] = view_matrix[14] - 6; //zoom

   /*=======================rotation========================*/
   function rotateZ(m, angle) {
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      let mv0 = m[0], mv4 = m[4], mv8 = m[8];
      m[0] = c * m[0] - s * m[1];
      m[4] = c * m[4] - s * m[5];
      m[8] = c * m[8] - s * m[9];
      m[1] = c * m[1] + s * mv0;
      m[5] = c * m[5] + s * mv4;
      m[9] = c * m[9] + s * mv8;
   }

   /*=================Drawing===========================*/
   let time_old = 0;
   let animate = function (time) {
      var dt = time - time_old;
      rotateZ(mov_matrix, dt * 0.002);
      time_old = time;
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.clearColor(0.5, 0.5, 0.5, 0.9);
      gl.clearDepth(1.0);
      gl.viewport(0.0, 0.0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
      gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
      gl.uniformMatrix4fv(Mmatrix, false, mov_matrix);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
      window.requestAnimationFrame(animate);
   }
   animate(0);
}
