import React, { useState, useEffect } from "react";
import "./index.css";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaCaretRight,
  FaCaretDown,
  FaPlus,
} from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./reducer";
import { KanbasState } from "../../store";
import * as modulesClient from "./client";
import { Module } from "./client";

function ModuleList() {
  const { courseId } = useParams();
  const validatedCourseId = courseId ? courseId : "";

  const moduleList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );

  const handleAddModule = async () => {
    try {
      const moduleData = { ...module };
      delete moduleData._id;
      const newModule = await modulesClient.createModule(
        validatedCourseId,
        moduleData
      );
      dispatch(addModule(newModule));
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteModule = async (module: Module) => {
    await modulesClient.deleteModule(validatedCourseId, module);
    dispatch(deleteModule(module._id));
    fetchAllModules();
  };

  const dispatch = useDispatch();
  const [selectedModule, setSelectedModule] = useState(moduleList[0]);

  const handleUpdateModule = async (module: Module) => {
    await modulesClient.updateModule(validatedCourseId, module);
    dispatch(updateModule(module));
    fetchAllModules();
  };

  const fetchAllModules = async () => {
    const modules = await modulesClient.findModulesForCourse(validatedCourseId);
    dispatch(setModules(modules));
  };

  useEffect(() => {
    fetchAllModules();
    modulesClient
      .findModulesForCourse(validatedCourseId)
      .then((modules) => dispatch(setModules(modules)));
  }, [validatedCourseId]);

  return (
    <>
      <div className="d-flex justify-content-end mt-2">
        <button className="btn btn-light me-2">Collapse All</button>
        <button className="btn btn-light me-2">View Progress</button>
        <select className="me-2 publish-dropdown">
          <option>Publish All</option>
          <option>Publish All Modules and Items</option>
          <option>Publish Modules only</option>
          <option>UnPublish All Modules</option>
        </select>
        <button className="btn btn-danger">+ Module</button>
        <button className="btn btn-light">
          <FaEllipsisV />
        </button>
      </div>
      <hr />
      <li className="list-group-item">
        <div className="row align-items-left">
          <div className="col-sm-4">
            <input
              value={module.name}
              onChange={(e) =>
                dispatch(setModule({ ...module, name: e.target.value }))
              }
              className="form-control"
              placeholder="Module Name"
            />
            <div className="col">
              <textarea
                value={module.description}
                onChange={(e) =>
                  dispatch(
                    setModule({ ...module, description: e.target.value })
                  )
                }
                className="form-control mt-2"
                placeholder="Module Description"
              />
            </div>
          </div>

          <div className="col-auto">
            <button
              className="btn btn-primary"
              onClick={(event) => {
                event.preventDefault();
                handleUpdateModule(module);
              }}
            >
              Update
            </button>

            <button className="btn btn-success" onClick={handleAddModule}>
              Add
            </button>
          </div>
        </div>
      </li>

      <ul className="list-group wd-modules">
        {moduleList
          .filter((module) => module.course === courseId)
          .map((module, index) => (
            <li
              key={index}
              className="list-group-item"
              onClick={() => setSelectedModule(module)}
            >
              <button
                className="btn btn-success float-end ms-2 me-2 mt-2"
                onClick={() => dispatch(setModule(module))}
              >
                Edit
              </button>

              <button
                className="btn btn-danger float-end ms-2 me-2 mt-2"
                onClick={() => handleDeleteModule(module)}
              >
                Delete
              </button>

              <div>
                <FaEllipsisV className="me-2" />
                <FaCaretRight className="me-2" />
                {module.name}
                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaCaretDown />
                  <FaPlus className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
                <p>{module.description}</p>
                <p>{module._id}</p>
              </div>
              {selectedModule?._id === module._id && (
                <ul className="list-group">
                  {module.lessons?.map(
                    (
                      lesson: {
                        name:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | null
                          | undefined;
                      },
                      index: React.Key | null | undefined
                    ) => (
                      <li className="list-group-item" key={index}>
                        <FaEllipsisV className="me-2" />
                        {lesson.name}
                        <span className="float-end">
                          <FaCheckCircle className="text-success" />
                          <FaEllipsisV className="ms-2" />
                        </span>
                      </li>
                    )
                  )}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </>
  );
}
export default ModuleList;
