/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import WrapperHocComponent from '../containers/Wrapper.container';
import { CreateSandboxContext } from '../SandboxContext';

function BuildSandboxContainer(props) {
  /* @state */
  const { data, setData } = useContext(CreateSandboxContext);

  /* @props */
  const { t: lang } = props;

  useEffect(function () {
    if (
      isEmpty(data.appName) ||
      isEmpty(data.folderPath) ||
      isEmpty(data.template) ||
      isEmpty(data.vcs)
    ) {
      history.push('/sandbox/template/');
    }
  }, []);

  return (
    <Fragment>
      <h1 className="text-gray-800 text-center font-sans text-4xl font-bold mt-16 mb-1">
        {lang('BuildSandbox.component.title')}
      </h1>
      <p className="mb-6 text-xl text-center text-gray-600">
        {lang('BuildSandbox.component.sub.title')}
      </p>
      <div className="max-w-sm mx-auto mt-10">
        <div className="loader_wrapper mt-20">
          <svg
            className="loader_img"
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 100 100"
          >
            <defs>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    '\n      .cls-1, .cls-2, .cls-5 { fill: none; } \n\t\t\t.cls-1, .cls-2 { stroke: #999; stroke-linecap: round; stroke-miterlimit: 10; } \t\t\t\t\n\t\t\t.cls-1 { stroke-width: 3px; } \n\t\t\t.cls-2, .cls-5 { stroke-width: 4px; } \n\t\t\t.cls-3 { fill: #fff; } \n\t\t\t.cls-4 { fill: #ccc; opacity: 0.5; } \n\t\t\t.progress { stroke: red; stroke-linejoin: round; stroke-linecap: round; }\n\t\t\t.progress2 { fill: none; stroke-width: 6px;}\n\t\t\t.hamsterFill { fill: #999}\n    ',
                }}
              />
              <symbol id="hamster" data-name="hamster" viewBox="0 0 80 38">
                <g id="hamster-3" data-name="hamster">
                  <path id="frontleg" d="M53 25l5 5" className="legs cls-1" />
                  <path id="backLeg" d="M10 33l5-5" className="legs cls-2" />
                  <path
                    className="hamsterFill"
                    id="body"
                    d="M64 4c-5-4-13-4-16-3l-6 4c-2 1-11 5-25 1-1-1-11-1-15 8a13 13 0 0 0 4 16c25 17 49 4 58-10s2-15 0-16z"
                  />
                  <circle
                    className="hamsterFill"
                    id="tail"
                    cx={2}
                    cy={14}
                    r={2}
                  />
                  <circle
                    className="hamsterFill"
                    id="ear"
                    cx={45}
                    cy={3}
                    r={3}
                  />
                  <path
                    id="eye"
                    d="M55 5a2 2 0 0 1 3 3 2 2 0 0 1-3-3z"
                    className="cls-3"
                  />
                </g>
              </symbol>
            </defs>
            <path
              id="wheel"
              d="M85 15a49 49 0 0 0-70 70 49 49 0 1 0 70-70zm-64 6a41 41 0 0 1 58 0l5 6-34 21-35-20zM9 50a41 41 0 0 1 4-18l35 19v40A41 41 0 0 1 9 50zm70 29a41 41 0 0 1-27 12V51l34-20a41 41 0 0 1-7 48z"
              className="cls-4"
            />
            <use id="whisky" width={80} height="37.58" xlinkHref="#hamster" />
            <g className="progressGroup">
              <circle
                id="progress"
                cx={50}
                cy={50}
                r={45}
                className="progress progress1 cls-5"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx={50}
                cy={50}
                r={45}
                className="progress progress2"
                transform="rotate(-90 50 50)"
              />
            </g>
          </svg>
        </div>
      </div>
    </Fragment>
  );
}

BuildSandboxContainer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default WrapperHocComponent(withNamespaces()(BuildSandboxContainer));
