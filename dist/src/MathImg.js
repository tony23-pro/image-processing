var MathImg = /** @class */ (function () {
    function MathImg() {
    }
    MathImg.initArray = function (width, height) {
        var arrImage = new Array(3);
        arrImage[0] = new Array(height);
        arrImage[1] = new Array(height);
        arrImage[2] = new Array(height);
        for (var i = 0; i < height; i++) {
            arrImage[0][i] = new Array(width);
            arrImage[1][i] = new Array(width);
            arrImage[2][i] = new Array(width);
        }
        return arrImage;
    };
    MathImg.initArray2D = function (width, height) {
        var arrImage = new Array(2);
        arrImage[0] = new Array(height);
        arrImage[1] = new Array(height);
        for (var i = 0; i < height; i++) {
            arrImage[0][i] = new Array(width);
            arrImage[1][i] = new Array(width);
        }
        return arrImage;
    };
    //nuvaFUNCION DE REALCE 
    MathImg.realceImagen = function (img) {
        // Obtiene la matriz 3D de la imagen en color
        var arrImage = img.getArrayImg();
        // Inicializa la matriz de salida
        var result = this.initArray(img.getWidth(), img.getHeight());
        // Define un kernel de realce (puedes ajustar los valores según tus necesidades)
        /* var kernel = [
           [-1, -1, -1],
           [-1, 9, -1],
           [-1, -1, -1]
         ];*/
        /*Kernel de Detección de Bordes (Edge Detection):
      Un kernel de detección de bordes resalta los bordes en la imagen.
        var kernel = [
                   [-1 , -1,  -1],
                   [-1,   8,  -1],
                   [-1 , -1  ,-1]
                  ];*/
        /*Kernel de Desenfoque (Blur):
       Un kernel de desenfoque suaviza la imagen y reduce el ruido.
         var kernel = [
       [1/9 , 1/9 , 1/9],
       [1/9 , 1/9 , 1/9],
       [1/9 , 1/9 , 1/9]
       
         ];*/
        //kernel de realce sharpen
        /* var kernel = [
           [0 , -1  , 0],
           [-1 , 5 , -1],
           [0  ,-1 ,  0]
         ];
       */
        var kernel = [
            [-1, -1, -1],
            [-1, 8, -1],
            [-1, -1, -1]
        ];
        for (var i = 1; i < img.getHeight() - 1; i++) {
            for (var j = 1; j < img.getWidth() - 1; j++) {
                for (var c = 0; c < 3; c++) {
                    var sum = 0;
                    // Aplica el filtro de convolución alrededor del píxel (i, j)
                    for (var x = -1; x <= 1; x++) {
                        for (var y = -1; y <= 1; y++) {
                            sum += arrImage[c][i + x][j + y] * kernel[x + 1][y + 1];
                        }
                    }
                    // Asegura que los valores estén en el rango 0-255
                    result[c][i][j] = Math.min(255, Math.max(0, sum));
                }
            }
        }
        return result;
    };
    MathImg.toGray = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var prom;
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                //0.299 + 0.587G + 0.114B.
                prom = (0.299 * arrImage[0][i][j] + 0.587 * arrImage[1][i][j] + 0.114 * arrImage[2][i][j]);
                sal[0][i][j] = prom;
                sal[1][i][j] = prom;
                sal[2][i][j] = prom;
            }
        }
        return sal;
    };
    MathImg.toNegative = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = 255 - arrImage[0][i][j];
                sal[1][i][j] = 255 - arrImage[1][i][j];
                sal[2][i][j] = 255 - arrImage[2][i][j];
            }
        }
        return sal;
    };
    MathImg.toNegativeGrises = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var prom;
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                prom = (0.299 * arrImage[0][i][j] + 0.587 * arrImage[1][i][j] + 0.114 * arrImage[2][i][j]);
                sal[0][i][j] = 255 - prom;
                sal[1][i][j] = 255 - prom;
                sal[2][i][j] = 255 - prom;
            }
        }
        return sal;
    };
    MathImg.toRed = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j];
                sal[1][i][j] = 0;
                sal[2][i][j] = 0;
            }
        }
        return sal;
    };
    MathImg.toGreen = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = 0;
                sal[1][i][j] = arrImage[1][i][j];
                sal[2][i][j] = 0;
            }
        }
        return sal;
    };
    MathImg.toBlue = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = 0;
                sal[1][i][j] = 0;
                sal[2][i][j] = arrImage[2][i][j];
            }
        }
        return sal;
    };
    //este codigose agrego el 4 de abril de 2022
    MathImg.toTricolor = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var inicio = 0, termino = img.getWidth() / 3;
        console.log(inicio, termino);
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = inicio; j < termino; j++) {
                sal[0][i][j] = 0;
                sal[1][i][j] = arrImage[1][i][j];
                sal[2][i][j] = 0;
            }
        }
        inicio = termino;
        termino = 2 * img.getWidth() / 3;
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = inicio; j < termino; j++) {
                sal[0][i][j] = arrImage[0][i][j];
                sal[1][i][j] = arrImage[0][i][j];
                sal[2][i][j] = arrImage[0][i][j];
            }
        }
        inicio = termino;
        termino = img.getWidth();
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = inicio; j < termino; j++) {
                sal[0][i][j] = arrImage[0][i][j];
                sal[1][i][j] = 0;
                sal[2][i][j] = 0;
            }
        }
        return sal;
    };
    //FUNCION TRICOLOR AGREGADA 23/09/2023//
    MathImg.toTricolorH = function (img) {
        // Variable que guarda el arreglo 3D de la imagen de color
        var arrImage = img.getArrayImg();
        // Variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var inicio = 0, termino = img.getHeight() / 3;
        console.log(inicio, termino);
        // Primera banda horizontal (parte superior)
        for (var i = inicio; i < termino; i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = 0;
                sal[1][i][j] = arrImage[1][i][j];
                sal[2][i][j] = 0;
            }
        }
        inicio = termino;
        termino = 2 * img.getHeight() / 3;
        // Segunda banda horizontal (parte central)
        for (var i = inicio; i < termino; i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j];
                sal[1][i][j] = arrImage[0][i][j];
                sal[2][i][j] = arrImage[0][i][j];
            }
        }
        inicio = termino;
        termino = img.getHeight();
        // Tercera banda horizontal (parte inferior)
        for (var i = inicio; i < termino; i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j];
                sal[1][i][j] = 0;
                sal[2][i][j] = 0;
            }
        }
        return sal;
    };
    //HASTA AQUI
    MathImg.correctionGamma = function (img, factores) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = this.funcionGamma(arrImage[0][i][j], factores[0]);
                sal[1][i][j] = this.funcionGamma(arrImage[1][i][j], factores[1]);
                sal[2][i][j] = this.funcionGamma(arrImage[2][i][j], factores[2]);
            }
        }
        return sal;
    };
    MathImg.funcionGamma = function (pixel, factor) {
        return Math.min(255 * Math.pow(pixel / 250, factor), 255);
    };
    MathImg.toUmbral = function (img, umbral) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var prom;
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
                if (prom > umbral) {
                    sal[0][i][j] = arrImage[0][i][j];
                    sal[1][i][j] = arrImage[1][i][j];
                    sal[2][i][j] = arrImage[2][i][j];
                }
                /*sal[0][i][j] = prom > umbral ? 255 : 0;
                sal[1][i][j] = sal[0][i][j];
                sal[2][i][j] = sal[0][i][j];*/
            }
        }
        return sal;
    };
    MathImg.toDesfaceX = function (img, des) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var fila = arrImage[0].length, cols = arrImage[0][0].length;
        for (var i = 0; i < fila; i++) {
            for (var j = 0; j < cols; j++) {
                sal[1][i][j] = arrImage[1][i][j];
                if ((j - des) >= 0) {
                    sal[0][i][j] = arrImage[0][i][j - des];
                }
                else {
                    sal[0][i][j] = arrImage[0][i][j];
                }
                if ((j + des) < cols) {
                    sal[2][i][j] = arrImage[2][i][j + des];
                }
                else {
                    sal[2][i][j] = arrImage[2][i][j];
                }
            }
        }
        return sal;
    };
    MathImg.toDesfaceY = function (img, desy) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var fila = arrImage[0].length, cols = arrImage[0][0].length;
        for (var i = 0; i < fila; i++) {
            for (var j = 0; j < cols; j++) {
                sal[1][i][j] = arrImage[1][i][j];
                if ((i - desy) >= 0) {
                    sal[0][i][j] = arrImage[0][i - desy][j];
                }
                else {
                    sal[0][i][j] = arrImage[0][i][j];
                }
                if ((i + desy) < fila) {
                    sal[2][i][j] = arrImage[2][i + desy][j];
                }
                else {
                    sal[2][i][j] = arrImage[2][i][j];
                }
            }
        }
        return sal;
    };
    MathImg.toDesfaceD = function (img, des, ang) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var fila = arrImage[0].length, cols = arrImage[0][0].length;
        var desx = Math.floor(des * Math.cos(ang * Math.PI / 180));
        var desy = Math.floor(des * Math.sin(ang * Math.PI / 180));
        for (var i = 0; i < fila; i++) {
            for (var j = 0; j < cols; j++) {
                sal[1][i][j] = arrImage[1][i][j];
                if ((i - desy) >= 0 && (j - desx) >= 0) {
                    sal[0][i][j] = arrImage[0][i - desy][j - desx];
                }
                else {
                    sal[0][i][j] = arrImage[0][i][j];
                }
                if ((i + desy) < fila && (j + desx) < cols) {
                    sal[2][i][j] = arrImage[2][i + desy][j + desx];
                }
                else {
                    sal[2][i][j] = arrImage[2][i][j];
                }
            }
        }
        return sal;
    };
    MathImg.toUmbral2limites = function (img, rangos) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var fila = arrImage[0].length, cols = arrImage[0][0].length;
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var rangoMin = rangos[0];
        var rangoMax = rangos[1];
        var prome;
        for (var i = 0; i < fila; i++) {
            for (var j = 0; j < cols; j++) {
                prome = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
                if (prome >= rangoMin && prome <= rangoMax) {
                    sal[0][i][j] = 250;
                }
                else
                    sal[0][i][j] = 0;
                sal[1][i][j] = sal[0][i][j];
                sal[2][i][j] = sal[0][i][j];
            }
        }
        return sal;
    };
    MathImg.changeBrightness = function (img, factor) {
        var arrImage = img.getArrayImg();
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j] + factor;
                sal[1][i][j] = arrImage[1][i][j] + factor;
                sal[2][i][j] = arrImage[2][i][j] + factor;
                /*sal[0][i][j] = arrImage[0][i][j] * factor > 255.0 ? 255.0 : arrImage[0][i][j] * factor;
                sal[1][i][j] = arrImage[1][i][j] * factor > 255.0 ? 255.0 : arrImage[1][i][j] * factor;
                sal[2][i][j] = arrImage[2][i][j] * factor > 255.0 ? 255.0 : arrImage[2][i][j] * factor;
              */
            }
        }
        return sal;
    };
    MathImg.cambioFTransferencia = function (img, factores) {
        var arrImage = img.getArrayImg();
        factores.unshift(0, 0);
        var tamFact = factores.length;
        var I1, I2, O1, O2;
        var factor;
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var k = 2; k < tamFact; k += 2) {
            I1 = factores[k - 2];
            O1 = factores[k - 1];
            I2 = factores[k];
            O2 = factores[k + 1];
            factor = (O2 - O1) / (I2 - I1);
            //console.log(factor)
            for (var i = 0; i < img.getHeight(); i++) {
                for (var j = 0; j < img.getWidth(); j++) {
                    if (arrImage[0][i][j] >= I1 && arrImage[0][i][j] < I2)
                        sal[0][i][j] = factor * (arrImage[0][i][j] - I1) + O1;
                    if (arrImage[1][i][j] >= I1 && arrImage[1][i][j] < I2)
                        sal[1][i][j] = factor * (arrImage[1][i][j] - I1) + O1;
                    if (arrImage[2][i][j] >= I1 && arrImage[2][i][j] < I2)
                        sal[2][i][j] = factor * (arrImage[2][i][j] - I1) + O1;
                }
            }
        }
        return sal;
    };
    MathImg.relativeBrightness = function (img) {
        var arrImage = img.getArrayImg();
        var sal = this.initArray2D(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                //si el valor del pixel > umbral, entoncesa calculo el brillo
                //si no el brillo =0
                sal[0][i][j] = Math.sqrt(Math.pow(arrImage[0][i][j], 2) * 0.299 +
                    Math.pow(arrImage[1][i][j], 2) * 0.587 +
                    Math.pow(arrImage[2][i][j], 2) * 0.114) / 100.0;
                sal[1][i][j] = 'rgb(' + arrImage[0][i][j] + ',' + arrImage[1][i][j] + ',' + arrImage[2][i][j] + ')';
            }
        }
        return sal;
    };
    /**
     * Metodo para Generar el contraste de una Imagen
     * @img  ImageType tipo de imagen donde se guarda una matriz tridimencional
     * @return number[][][] es la imagen de salida con contraste
     */
    MathImg.changeContraste = function (img, valor) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        //
        var cR, cG, cB;
        var contraste;
        contraste = (valor + 100) / 100;
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                cR = ((((arrImage[0][i][j] / 255.0) - 0.5) * contraste) + 0.5) * 255.0;
                if (cR > 255)
                    cR = 255;
                if (cR < 0)
                    cR = 0;
                sal[0][i][j] = cR;
                cG = ((((arrImage[1][i][j] / 255.0) - 0.5) * contraste) + 0.5) * 255.0;
                if (cG > 255)
                    cG = 255;
                if (cG < 0)
                    cG = 0;
                sal[1][i][j] = cG;
                cB = ((((arrImage[2][i][j] / 255.0) - 0.5) * contraste) + 0.5) * 255.0;
                if (cB > 255)
                    cB = 255;
                if (cB < 0)
                    cB = 0;
                sal[2][i][j] = cB;
            }
        }
        return sal;
    };
    MathImg.colorGradienteX = function (img, factores) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var prom;
        var r1, r2, b1, b2, g1, g2;
        var dr, dg, db, dir;
        r1 = factores[0];
        g1 = factores[1];
        b1 = factores[2];
        r2 = factores[3];
        g2 = factores[4];
        b2 = factores[5];
        dr = (r2 - r1) / img.getWidth();
        dg = (g2 - g1) / img.getWidth();
        db = (b2 - b1) / img.getWidth();
        for (var j = 0; j < img.getWidth(); j++) {
            for (var i = 0; i < img.getHeight(); i++) {
                prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
                sal[0][i][j] = Math.floor(prom * r1 / 255);
                sal[1][i][j] = Math.floor(prom * g1 / 255);
                sal[2][i][j] = Math.floor(prom * b1 / 255);
            }
            r1 += dr;
            g1 += dg;
            b1 += db;
        }
        return sal;
    };
    MathImg.colorGradientY = function (img, factores) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var prom;
        var r1, r2, b1, b2, g1, g2;
        var dr, dg, db;
        r1 = factores[0];
        g1 = factores[1];
        b1 = factores[2];
        r2 = factores[3];
        g2 = factores[4];
        b2 = factores[5];
        dr = (r2 - r1) / img.getHeight();
        dg = (g2 - g1) / img.getHeight();
        db = (b2 - b1) / img.getHeight();
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                prom = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
                sal[0][i][j] = Math.floor(prom * r1 / 255);
                sal[1][i][j] = Math.floor(prom * g1 / 255);
                sal[2][i][j] = Math.floor(prom * b1 / 255);
            }
            r1 += dr;
            g1 += dg;
            b1 += db;
        }
        return sal;
    };
    MathImg.pow = function (img, power) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = Math.pow(arrImage[0][i][j], power);
                sal[1][i][j] = Math.pow(arrImage[1][i][j], power);
                sal[2][i][j] = Math.pow(arrImage[2][i][j], power);
            }
        }
        return sal;
    };
    MathImg.toCos = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = Math.cos(arrImage[0][i][j]);
                sal[1][i][j] = Math.cos(arrImage[1][i][j]);
                sal[2][i][j] = Math.cos(arrImage[2][i][j]);
            }
        }
        return sal;
    };
    MathImg.toSubtract = function (img, escalar) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j] - escalar;
                sal[1][i][j] = arrImage[1][i][j] - escalar;
                sal[2][i][j] = arrImage[2][i][j] - escalar;
            }
        }
        return sal;
    };
    MathImg.toMultiplication = function (img, valor) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = valor * arrImage[0][i][j];
                sal[1][i][j] = valor * arrImage[1][i][j];
                sal[2][i][j] = valor * arrImage[2][i][j];
            }
        }
        return sal;
    };
    MathImg.toSine = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = Math.sin(arrImage[0][i][j]);
                sal[1][i][j] = Math.sin(arrImage[1][i][j]);
                sal[2][i][j] = Math.sin(arrImage[2][i][j]);
            }
        }
        return sal;
    };
    MathImg.toAdd = function (img, sumar) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j] + sumar;
                sal[1][i][j] = arrImage[1][i][j] + sumar;
                sal[2][i][j] = arrImage[2][i][j] + sumar;
            }
        }
        return sal;
    };
    MathImg.toDividir = function (img, dividir) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j] / dividir;
                sal[1][i][j] = arrImage[1][i][j] / dividir;
                sal[2][i][j] = arrImage[2][i][j] / dividir;
            }
        }
        return sal;
    };
    MathImg.toSqrt = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = Math.sqrt(arrImage[0][i][j]);
                sal[1][i][j] = Math.sqrt(arrImage[1][i][j]);
                sal[2][i][j] = Math.sqrt(arrImage[2][i][j]);
            }
        }
        return sal;
    };
    MathImg.toTan = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = Math.tan(arrImage[0][i][j]);
                sal[1][i][j] = Math.tan(arrImage[1][i][j]);
                sal[2][i][j] = Math.tan(arrImage[2][i][j]);
            }
        }
        return sal;
    };
    MathImg.addImg = function (img, img2) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        var arrImage2 = img2.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = arrImage[0][i][j] + 0.2 * arrImage2[0][i][j];
                sal[1][i][j] = arrImage[1][i][j] + 0.2 * arrImage2[1][i][j];
                sal[2][i][j] = arrImage[2][i][j] + 0.2 * arrImage2[2][i][j];
            }
        }
        return sal;
    };
    MathImg.marcaAguaCentro = function (img, img2, porc) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage;
        var arrImage2;
        var width;
        var height;
        var sal;
        var midW, midH;
        var midsmallW, midsmallH;
        var widthsmall, heightsmall;
        if (img.getWidth() > img2.getWidth()) {
            arrImage = img.getArrayImg();
            arrImage2 = img2.getArrayImg();
            width = img.getWidth();
            height = img.getHeight();
            widthsmall = img2.getWidth();
            heightsmall = img2.getHeight();
            sal = this.initArray(img.getWidth(), img.getHeight());
        }
        else {
            arrImage2 = img.getArrayImg();
            arrImage = img2.getArrayImg();
            width = img2.getWidth();
            height = img2.getHeight();
            widthsmall = img.getWidth();
            heightsmall = img.getHeight();
            sal = this.initArray(img2.getWidth(), img2.getHeight());
        }
        midW = Math.floor(width / 2);
        midH = Math.floor(height / 2);
        midsmallW = Math.floor(widthsmall / 2);
        midsmallH = Math.floor(heightsmall / 2);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                sal[0][i][j] = arrImage[0][i][j];
                sal[1][i][j] = arrImage[1][i][j];
                sal[2][i][j] = arrImage[2][i][j];
            }
        }
        for (var i = 0; i < heightsmall; i++) {
            for (var j = 0; j < widthsmall; j++) {
                sal[0][midH - midsmallH + i][midW - midsmallW + j] += arrImage2[0][i][j] * porc;
                sal[1][midH - midsmallH + i][midW - midsmallW + j] += arrImage2[1][i][j] * porc;
                sal[2][midH - midsmallH + i][midW - midsmallW + j] += arrImage2[2][i][j] * porc;
            }
        }
        return sal;
    };
    MathImg.marcaAguaArray = function (img, img2, porc) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage;
        var arrImage2;
        var width;
        var height;
        var sal;
        var widthsmall, heightsmall;
        var noVecesAncho, noVecesAlto;
        if (img.getWidth() > img2.getWidth()) {
            arrImage = img.getArrayImg();
            arrImage2 = img2.getArrayImg();
            width = img.getWidth();
            height = img.getHeight();
            widthsmall = img2.getWidth();
            heightsmall = img2.getHeight();
            sal = this.initArray(img.getWidth(), img.getHeight());
        }
        else {
            arrImage2 = img.getArrayImg();
            arrImage = img2.getArrayImg();
            width = img2.getWidth();
            height = img2.getHeight();
            widthsmall = img.getWidth();
            heightsmall = img.getHeight();
            sal = this.initArray(img2.getWidth(), img2.getHeight());
        }
        noVecesAncho = Math.floor(width / widthsmall);
        noVecesAlto = Math.floor(height / heightsmall);
        for (var w = 0; w <= noVecesAlto; w++) {
            for (var v = 0; v <= noVecesAncho; v++) {
                for (var i = 0; i < heightsmall; i++) {
                    for (var j = 0; j < widthsmall; j++) {
                        if ((i + w * heightsmall) < height && (j + v * widthsmall) < width) {
                            sal[0][i + w * heightsmall][j + v * widthsmall] = arrImage[0][i + w * heightsmall][j + v * widthsmall] + arrImage2[0][i][j] * porc;
                            sal[1][i + w * heightsmall][j + v * widthsmall] = arrImage[1][i + w * heightsmall][j + v * widthsmall] + arrImage2[1][i][j] * porc;
                            sal[2][i + w * heightsmall][j + v * widthsmall] = arrImage[2][i + w * heightsmall][j + v * widthsmall] + arrImage2[2][i][j] * porc;
                        }
                        //else
                        // break;
                    }
                }
            }
        }
        return sal;
    };
    MathImg.hist = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = new Array(3);
        sal[0] = new Array(256);
        sal[1] = new Array(256);
        sal[2] = new Array(256);
        for (var i = 0; i < 256; i++) {
            sal[0][i] = 0;
            sal[1][i] = 0;
            sal[2][i] = 0;
        }
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                //console.log(arrImage[0][i][j], i,j )
                sal[0][arrImage[0][i][j]]++;
                sal[1][arrImage[1][i][j]]++;
                sal[2][arrImage[2][i][j]]++;
            }
        }
        //console.log(sal[0])
        return sal;
    };
    MathImg.histAcum = function (h) {
        //variable donde guardamos la salida
        var hist = new Array(3);
        hist[0] = new Array(256);
        hist[1] = new Array(256);
        hist[2] = new Array(256);
        hist[0][0] = h[0][0];
        hist[1][0] = h[1][0];
        hist[2][0] = h[2][0];
        for (var i = 1; i < h[0].length; i++) {
            hist[0][i] = hist[0][i - 1] + h[0][i];
            hist[1][i] = hist[1][i - 1] + h[1][i];
            hist[2][i] = hist[2][i - 1] + h[2][i];
            //if(i==255)
        }
        return hist;
    };
    MathImg.ecualizar = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var h = this.hist(img);
        var hA = this.histAcum(h);
        var fT;
        fT = new Array(3);
        fT[0] = new Array(256);
        fT[2] = new Array(256);
        fT[1] = new Array(256);
        for (var i = 0; i < 256; i++) {
            fT[0][i] = Math.floor(hA[0][i] * 255.0 / hA[0][255]);
            fT[1][i] = Math.floor(hA[1][i] * 255.0 / hA[1][255]);
            fT[2][i] = Math.floor(hA[2][i] * 255.0 / hA[2][254]);
        }
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = fT[0][arrImage[0][i][j]];
                sal[1][i][j] = fT[1][arrImage[1][i][j]];
                sal[2][i][j] = fT[2][arrImage[2][i][j]];
            }
        }
        return sal;
    };
    MathImg.erosionar = function (img, vec8) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = 0;
                sal[1][i][j] = 0;
                sal[2][i][j] = 0;
            }
        }
        var vecinos, valorComp = 4;
        if (vec8)
            valorComp = 8;
        for (var i = 1; i < img.getHeight() - 1; i++) {
            for (var j = 1; j < img.getWidth() - 1; j++) {
                vecinos = 0;
                vecinos += arrImage[0][i + 1][j] ? 1 : 0;
                vecinos += arrImage[0][i - 1][j] ? 1 : 0;
                vecinos += arrImage[0][i][j + 1] ? 1 : 0;
                vecinos += arrImage[0][i][j - 1] ? 1 : 0;
                if (vec8) {
                    vecinos += arrImage[0][i + 1][j - 1] ? 1 : 0;
                    vecinos += arrImage[0][i + 1][j + 1] ? 1 : 0;
                    vecinos += arrImage[0][i - 1][j + 1] ? 1 : 0;
                    vecinos += arrImage[0][i - 1][j - 1] ? 1 : 0;
                }
                if (arrImage[0][i][j] && vecinos == valorComp) {
                    sal[0][i][j] = 255;
                    sal[1][i][j] = 255;
                    sal[2][i][j] = 255;
                }
            }
        }
        return sal;
    };
    MathImg.dilatar = function (img, vec8) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                sal[0][i][j] = 0;
                sal[1][i][j] = 0;
                sal[2][i][j] = 0;
            }
        }
        var vecinos, valorComp = 4;
        if (vec8)
            valorComp = 8;
        for (var i = 1; i < img.getHeight() - 1; i++) {
            for (var j = 1; j < img.getWidth() - 1; j++) {
                vecinos = 0;
                vecinos += arrImage[0][i + 1][j] ? 1 : 0;
                vecinos += arrImage[0][i - 1][j] ? 1 : 0;
                vecinos += arrImage[0][i][j + 1] ? 1 : 0;
                vecinos += arrImage[0][i][j - 1] ? 1 : 0;
                if (vec8) {
                    vecinos += arrImage[0][i + 1][j - 1] ? 1 : 0;
                    vecinos += arrImage[0][i + 1][j + 1] ? 1 : 0;
                    vecinos += arrImage[0][i - 1][j + 1] ? 1 : 0;
                    vecinos += arrImage[0][i - 1][j - 1] ? 1 : 0;
                }
                if (arrImage[0][i][j] && vecinos) {
                    sal[0][i][j] = 255;
                    sal[1][i][j] = 255;
                    sal[2][i][j] = 255;
                }
            }
        }
        return sal;
    };
    MathImg.apertura = function (img, vec8) {
        var arrImage = this.erosionar(img, vec8);
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var vecinos, valorComp = 4;
        if (vec8)
            valorComp = 8;
        for (var i = 1; i < img.getHeight() - 1; i++) {
            for (var j = 1; j < img.getWidth() - 1; j++) {
                vecinos = 0;
                vecinos += arrImage[0][i + 1][j] ? 1 : 0;
                vecinos += arrImage[0][i - 1][j] ? 1 : 0;
                vecinos += arrImage[0][i][j + 1] ? 1 : 0;
                vecinos += arrImage[0][i][j - 1] ? 1 : 0;
                if (vec8) {
                    vecinos += arrImage[0][i + 1][j - 1] ? 1 : 0;
                    vecinos += arrImage[0][i + 1][j + 1] ? 1 : 0;
                    vecinos += arrImage[0][i - 1][j + 1] ? 1 : 0;
                    vecinos += arrImage[0][i - 1][j - 1] ? 1 : 0;
                }
                if (arrImage[0][i][j] && vecinos) {
                    sal[0][i][j] = 255;
                    sal[1][i][j] = 255;
                    sal[2][i][j] = 255;
                }
            }
        }
        return sal;
    };
    MathImg.cierre = function (img, vec8) {
        var arrImage = this.dilatar(img, vec8);
        var vecinos, valorComp = 4;
        var sal = this.initArray(img.getWidth(), img.getHeight());
        if (vec8)
            valorComp = 8;
        for (var i = 1; i < img.getHeight() - 1; i++) {
            for (var j = 1; j < img.getWidth() - 1; j++) {
                vecinos = 0;
                vecinos += arrImage[0][i + 1][j] ? 1 : 0;
                vecinos += arrImage[0][i - 1][j] ? 1 : 0;
                vecinos += arrImage[0][i][j + 1] ? 1 : 0;
                vecinos += arrImage[0][i][j - 1] ? 1 : 0;
                if (vec8) {
                    vecinos += arrImage[0][i + 1][j - 1] ? 1 : 0;
                    vecinos += arrImage[0][i + 1][j + 1] ? 1 : 0;
                    vecinos += arrImage[0][i - 1][j + 1] ? 1 : 0;
                    vecinos += arrImage[0][i - 1][j - 1] ? 1 : 0;
                }
                if (arrImage[0][i][j] && vecinos == valorComp) {
                    sal[0][i][j] = 255;
                    sal[1][i][j] = 255;
                    sal[2][i][j] = 255;
                }
            }
        }
        return sal;
    };
    MathImg.fromRGBtoHSI = function (img) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(img.getWidth(), img.getHeight());
        var hue;
        for (var i = 0; i < img.getHeight(); i++) {
            for (var j = 0; j < img.getWidth(); j++) {
                arrImage[0][i][j] /= 255.0;
                arrImage[1][i][j] /= 255.0;
                arrImage[2][i][j] /= 255.0;
                hue = 180 / Math.PI * Math.acos(0.5 * ((arrImage[0][i][j] - arrImage[1][i][j]) + (arrImage[0][i][j] - arrImage[2][i][j])) /
                    Math.sqrt(Math.pow(arrImage[0][i][j] - arrImage[1][i][j], 2) + (arrImage[0][i][j] - arrImage[2][i][j]) * (arrImage[1][i][j] - arrImage[2][i][j])));
                sal[0][i][j] = arrImage[2][i][j] > arrImage[1][i][j] ? 360 - hue : hue;
                sal[1][i][j] = 1 - (3 * Math.min(arrImage[0][i][j], arrImage[1][i][j], arrImage[2][i][j])) / (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]);
                sal[2][i][j] = (arrImage[0][i][j] + arrImage[1][i][j] + arrImage[2][i][j]) / 3;
            }
        }
        return sal;
    };
    MathImg.fromHSItoRGB = function (arrImage) {
        //variable que guarda el arreglo 3d de la imagen de color
        var width;
        var height;
        height = arrImage[0].length;
        width = arrImage[0][0].length;
        //variable donde guardamos la salida
        var sal = this.initArray(width, height);
        var hue;
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                //H de 0 - 120
                if (arrImage[0][i][j] >= 0 && arrImage[0][i][j] < 120) {
                    sal[0][i][j] = arrImage[2][i][j] * (1 + (arrImage[1][i][j] * Math.cos(this.toRad(arrImage[0][i][j]))) /
                        (Math.cos(this.toRad(60 - arrImage[0][i][j]))));
                    sal[2][i][j] = arrImage[2][i][j] * (1 - arrImage[1][i][j]);
                    sal[1][i][j] = 3 * arrImage[2][i][j] - sal[0][i][j] - sal[2][i][j];
                }
                else if (arrImage[0][i][j] >= 120 && arrImage[0][i][j] < 240) {
                    sal[0][i][j] = arrImage[2][i][j] * (1 - arrImage[1][i][j]);
                    sal[1][i][j] = arrImage[2][i][j] * (1 + (arrImage[1][i][j] * Math.cos(this.toRad(arrImage[0][i][j] - 120))) /
                        (Math.cos(this.toRad(180 - arrImage[0][i][j]))));
                    sal[2][i][j] = 3 * arrImage[2][i][j] - sal[0][i][j] - sal[1][i][j];
                }
                else if (arrImage[0][i][j] >= 240 && arrImage[0][i][j] < 360) {
                    sal[1][i][j] = arrImage[2][i][j] * (1 - arrImage[1][i][j]);
                    sal[2][i][j] = arrImage[2][i][j] * (1 + (arrImage[1][i][j] * Math.cos(this.toRad(arrImage[0][i][j] - 240))) /
                        (Math.cos(this.toRad(300 - arrImage[0][i][j]))));
                    sal[0][i][j] = 3 * arrImage[2][i][j] - sal[1][i][j] - sal[2][i][j];
                }
                sal[0][i][j] *= 255.0;
                sal[1][i][j] *= 255.0;
                sal[2][i][j] *= 255.0;
            }
        }
        return sal;
    };
    MathImg.toRad = function (grados) {
        return (grados * Math.PI / 180);
    };
    MathImg.falseColorByHue = function (arrImage, hue, newHue) {
        var width;
        var height;
        height = arrImage[0].length;
        width = arrImage[0][0].length;
        //variable donde guardamos la salida
        var sal = this.initArray(width, height);
        var range = 25;
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                //si hue es menor a cero estamos en el rango de 360 bajos, por lo que hay que revisar esos valores
                if ((hue - range) < 0) {
                    if (Math.abs(hue - arrImage[0][i][j]) < range) {
                        sal[0][i][j] = newHue;
                    }
                    else if ((360 + hue - arrImage[0][i][j]) < range) {
                        sal[0][i][j] = newHue;
                    }
                    else {
                        sal[0][i][j] = arrImage[0][i][j];
                    }
                }
                else if ((hue + range) > 360) {
                    if (Math.abs(hue - arrImage[0][i][j]) < range) {
                        sal[0][i][j] = newHue;
                    }
                    else if ((-360 + hue - arrImage[0][i][j]) < range) {
                        sal[0][i][j] = newHue;
                    }
                    else {
                        sal[0][i][j] = arrImage[0][i][j];
                    }
                } // si no se rebasa del cero
                else if (Math.abs(hue - arrImage[0][i][j]) < range) {
                    sal[0][i][j] = newHue;
                } // si no se rebasa del rango
                else {
                    sal[0][i][j] = arrImage[0][i][j];
                }
                sal[1][i][j] = arrImage[1][i][j];
                sal[2][i][j] = arrImage[2][i][j];
            }
        }
        return sal;
    };
    //aqui va ir el codigo de la trasnformacion bilineal  
    MathImg.bilineal = function () {
        return 0;
    };
    MathImg.pulso = function (width, height) {
        //variable que guarda el arreglo 3d de la imagen de color
        //var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                sal[0][i][j] = 0;
                sal[1][i][j] = 0;
                sal[2][i][j] = 0;
            }
        }
        sal[0][Math.floor(height / 2)][Math.floor(width / 2)] = 255;
        sal[1][Math.floor(height / 2)][Math.floor(width / 2)] = 255;
        sal[2][Math.floor(height / 2)][Math.floor(width / 2)] = 255;
        return sal;
    };
    MathImg.ruido = function (width, height) {
        //variable que guarda el arreglo 3d de la imagen de color
        //var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                sal[0][i][j] = (Math.random() * 256) > 128 ? 255 : 0;
                sal[1][i][j] = sal[0][i][j];
                sal[2][i][j] = sal[0][i][j];
            }
        }
        return sal;
    };
    MathImg.rampaX = function (width, height) {
        //variable que guarda el arreglo 3d de la imagen de color
        //var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                sal[0][i][j] = j;
                sal[1][i][j] = j;
                sal[2][i][j] = j;
            }
        }
        return sal;
    };
    MathImg.rampaY = function (width, height) {
        //variable que guarda el arreglo 3d de la imagen de color
        //var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var sal = this.initArray(width, height);
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                sal[0][i][j] = i;
                sal[1][i][j] = i;
                sal[2][i][j] = i;
            }
        }
        return sal;
    };
    MathImg.escalar = function (img, factor) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var newHeight = Math.floor(img.getHeight() * factor), newWitdh = Math.floor(img.getWidth() * factor);
        var sal = this.initArray(newWitdh, newHeight);
        for (var i = 0; i < newHeight; i++) {
            for (var j = 0; j < newWitdh; j++) {
                sal[0][i][j] = arrImage[0][Math.floor(i / factor)][Math.floor(j / factor)];
                sal[1][i][j] = arrImage[1][Math.floor(i / factor)][Math.floor(j / factor)];
                sal[2][i][j] = arrImage[2][Math.floor(i / factor)][Math.floor(j / factor)];
            }
        }
        /*
        for (let i = 0; i < img.getHeight(); i++) {
          for (let j = 0; j < img.getWidth(); j++) {
            sal[0][Math.floor(i*factor)][Math.floor(j*factor)] = arrImage[0][i][j] ;
            sal[1][Math.floor(i*factor)][Math.floor(j*factor)] = arrImage[1][i][j] ;
            sal[2][Math.floor(i*factor)][Math.floor(j*factor)] = arrImage[2][i][j] ;
          }
        }*/
        return sal;
    };
    MathImg.rotar = function (img, angulo) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var newHeight = img.getHeight(), newWitdh = img.getWidth();
        var sal = this.initArray(newWitdh, newHeight);
        var xP = newWitdh / 2, yP = newHeight / 2;
        var phi = (angulo * Math.PI / 180), c = Math.cos(phi), s = Math.sin(phi), r11 = c, r12 = s, r21 = -s, r22 = c, r31 = -xP * c + yP * s + xP, r32 = -xP * s - yP * c + yP;
        var nX, nY;
        for (var i = 0; i < newHeight; i++) {
            for (var j = 0; j < newWitdh; j++) {
                nX = Math.floor(j * r11 + i * r21 + r31);
                nY = Math.floor(j * r12 + i * r22 + r32);
                debugger;
                if ((nX >= 0 && nX < newWitdh) && (nY >= 0 && nY < newHeight)) {
                    sal[0][i][j] = arrImage[0][nY][nX];
                    sal[1][i][j] = arrImage[1][nY][nX];
                    sal[2][i][j] = arrImage[2][nY][nX];
                }
            }
        }
        return sal;
    };
    MathImg.shearingX = function (img, factor) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var newHeight = img.getHeight(), newWitdh = img.getWidth();
        var sal = this.initArray(newWitdh, newHeight);
        console.log(newWitdh, newHeight);
        for (var i = 0; i < newHeight; i++) {
            for (var j = 0; j < newWitdh; j++) {
                if ((j + Math.floor(factor * i)) < newWitdh) {
                    sal[0][i][j + Math.floor(factor * i)] = arrImage[0][i][j];
                    sal[1][i][j + Math.floor(factor * i)] = arrImage[1][i][j];
                    sal[2][i][j + Math.floor(factor * i)] = arrImage[2][i][j];
                }
            }
        }
        return sal;
    };
    MathImg.shearingY = function (img, factor) {
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var newHeight = img.getHeight(), newWitdh = img.getWidth();
        var sal = this.initArray(newWitdh, newHeight);
        console.log(newWitdh, newHeight);
        for (var i = 0; i < newHeight; i++) {
            for (var j = 0; j < newHeight; j++) {
                if ((i + Math.floor(factor * j)) < newWitdh) {
                    sal[0][i + Math.floor(factor * j)][j] = arrImage[0][i][j];
                    sal[1][i + Math.floor(factor * j)][j] = arrImage[1][i][j];
                    sal[2][i + Math.floor(factor * j)][j] = arrImage[2][i][j];
                }
            }
        }
        return sal;
    };
    MathImg.tAfin = function (img, factores) {
        var x1a = 0, x2a = img.getWidth(), x3a = 0;
        var y1a = 0, y2a = 0, y3a = img.getHeight();
        var x1r = factores[0], x2r = factores[2], x3r = factores[4];
        var y1r = factores[1], y2r = factores[3], y3r = factores[5];
        var x4r = x2r - x1r;
        var y4r = y1r + y2r + y3r;
        //variable que guarda el arreglo 3d de la imagen de color
        var arrImage = img.getArrayImg();
        //variable donde guardamos la salida
        var newHeight = y4r - y1r, newWitdh = x2r - x3r;
        var sal = this.initArray(newWitdh, newHeight);
        /*
        for (let i = 0; i < newHeight; i++) {
          for (let j = 0; j < newHeight; j++) {
            if ((i+ Math.floor(factor*j)) < newWitdh) {
              sal[0][i+ Math.floor(factor*j)][j] = arrImage[0][i][j];
              sal[1][i+ Math.floor(factor*j)][j] = arrImage[1][i][j];
              sal[2][i+ Math.floor(factor*j)][j] = arrImage[2][i][j];
            }
          }
        }
      */
        return sal;
    };
    return MathImg;
}());
export { MathImg };
