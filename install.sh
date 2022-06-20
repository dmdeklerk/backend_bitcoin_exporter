# run as sudo
DIR=`pwd`
APP="backend_ethereum_exporter"
npm install
echo "Installing $APP in $DIR"
sudo tee "/lib/systemd/system/$APP.service" <<EOF
[Unit]
Description=$APP prometheus exporter
Documentation=
After=network.target

[Service]
Environment=
Type=simple
User=root
ExecStart=/usr/bin/node $DIR/index.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable $APP
sudo systemctl start $APP