/*
 * Created on Wed Dec 09 2020
 *
 * The MIT License (MIT)
 * Copyright (c) 2020 Xin Li
 * Insitution: Department of Electrical and Computer Engineering, Rutgers University New Brunswick
 * Email: xl598@scarletmail.rutgers.edu
 * Personal Website: helloimlixin.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React, { Component } from "react";

import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import OrbitControls from "three-orbitcontrols";

class MaterialRoom extends Component {
    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
    
        this.scene = new THREE.Scene();
    
        // Add Renderer.
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor("#263228");
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
    
        // Add Camera.
        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        );
        this.camera.position.z = 8;
        this.camera.position.y = 5;
    
        // Camera Controls.
        const controls =new OrbitControls(this.camera, this.renderer.domElement);
        
        // Lights.
        var lights = [];
    
        lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
        lights[1] = new THREE.PointLight(0xffffff, 1, 0);
        lights[2] = new THREE.PointLight(0xffffff, 1, 0);
        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(-100, -200, -100);
        this.scene.add(lights[0]);
        this.scene.add(lights[1]);
        this.scene.add(lights[2]);
    
        // Add 3D models.
        this.renderScene();
    
        // Start animation.
        this.start();
    }
    
    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    };
    
    stop = () => {
        cancelAnimationFrame(this.frameId);
    };
    
    animate = () => {
        // Animate models here.
        // Redraw scene with the camera and the scene object.
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    };
    
    renderScene = () => {
        if (this.renderer) {
            this.renderer.render(this.scene, this.camera);
        }
    };

    render() {
        return (
            <div style={{ width: "800px", height: "800px" }}
            ref={mount => {this.mount = mount}} />
        )
    }
};

export default MaterialRoom;