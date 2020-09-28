import * as THREE from 'three';

/* Coin animation */
export function coin(canvas) {
    const { scene, camera, renderer } = setupScene(40, 310 / 220, 1, 1000, { alpha: true, canvas }, 310, 220, 0xffffff, 1);

    [[0xff4422, .5, -1, -1, 3], [0x44ff88, .5, 1, 2, 3], [0xdd3311, .5, 0, 3, 2]].forEach(params => pointLight(...params, scene));

    const cylinder = coinSurface(scene, 0.45, .65, 30, 0, 7, 7, .6, 100);

    camera.position.z = 25;

    const animate = function () {
        const id = requestAnimationFrame(animate);

        cylinder.rotation.y -= 0.00575;
        cylinder.rotation.x += 0.00175;

        renderer.render(scene, camera);
        return id;
    };


    return animate();
}


function coinSurface(scene, metalness, roughness, repeatX, repeatY, rtop, rbottom, h, rsegments) {

    const textures = text();
    THREE.ImageUtils.crossOrigin = '';

    const textureCirc = new THREE.TextureLoader().load(textures.circum);
    textureCirc.wrapS = THREE.RepeatWrapping;
    textureCirc.repeat.set(repeatX, repeatY);


    const materials = [
        //Circumference
        new THREE.MeshStandardMaterial({
            map: textureCirc,
            metalness: metalness,
            roughness: roughness
        }),
        //sides
        new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(textures.gold),
            metalness: metalness,
            roughness: roughness
        }),

        new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(textures.silver),
            metalness: metalness,
            roughness: roughness
        })
    ];


    const geometry = new THREE.CylinderGeometry(rtop, rbottom, h, rsegments);

    const cylinder = new THREE.Mesh(geometry, materials);
    scene.add(cylinder);

    return cylinder;
}


const text = function () {
    const path = "assets/images/";
    const JPG = ".jpg";
    const PNG = ".png";

    return {
        circum: path + "circumference" + JPG,
        gold: path + "goldcoin" + PNG,
        silver: path + "silvercoin" + PNG,
    }
}

function pointLight(color, intensity, x, y, z, scene) {
    const pointLight = new THREE.PointLight(color, intensity);
    pointLight.position.set(x, y, z);
    scene.add(pointLight);
}

function setupScene(fov, aspect, near, far, webGLRendererParameters, w, h, ambientColor, intensity) {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    const renderer = new THREE.WebGLRenderer(webGLRendererParameters);

    renderer.setSize(w, h);

    scene.add(new THREE.AmbientLight(ambientColor, intensity));

    return {
        scene,
        camera,
        renderer
    }
}

