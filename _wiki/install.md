---
title: Arkime Install
layout: wiki
permalink: "/install"
copyLink: True
---


- TOC
{:toc}
{: .left-nav .d-none .d-sm-block .pt-3 .with-footer .wiki-toc }

<div class="full-height-container with-footer px-3 mb-4 mt-1" markdown="1">


# Installation Guide for Arkime
{: .section-header .mt-1 }

This guide details the steps involved in installing Arkime on a Linux machine.
A basic Arkime cluster consists of a database (OpenSearch or Elasticsearch) and Arkime sensors.
Arkime sensors run the capture and viewer tools and process the network traffic.
The capture tool is responsible for processing and storing the packets along with extracting the metadata to be stored in OpenSearch or Elasticsearch.
The viewer tool provides the end-user interface, packet retrieval, and some housekeeping functions.
It is possible to run both the database and sensors on the same machine, however it is not recommended for production environments.

If you are interested in how many and types of machines you need for your environment, please see our [hardware estimators](https://arkime.com/estimators).

# Linux Distribution
{: .section-header }

We recommend using a stable version of Debian or Long-Term Support (LTS) version of Ubuntu.
Both of these distributions are well supported, receive regular updates, and are easy to upgrade.
Users of other distributions may need to modify the installation commands or run into library compatibility issues.

# Installing OpenSearch or Elasticsearch
{: .section-header }

Arkime requires a database to store the metadata associated with the network sessions that are processed.
It is strongly recommended to NOT use the same machines for both the database and the sensors in a production environment.
If you must use the same machines, please use different disk partitions for the database and the saved packets, otherwise, there will be contention for disk space and things will eventually stop working.

We answer many OpenSearch/Elasticsearch questions in the OpenSearch/Elasticsearch section of the [FAQ](https://arkime.com/faq#elasticsearch).

### Download and Install OpenSearch or Elasticsearch
{: .subsection }

There are many ways to download and install [OpenSearch](https://opensearch.org/downloads.html) or [Elasticsearch](https://www.elastic.co/downloads/elasticsearch), we recommend using the official packages for your OS distribution when possible.
For a test environment, running OpenSearch or Elasticsearch on the same machine as the Arkime sensor will work, otherwise, please use separate machines.
In a production environment, we recommend having at least three machines for OpenSearch/Elasticsearch to provide redundancy, and they work best with three leader/master nodes.
We currently support both OpenSearch and Elasticsearch equally.

### Install and Configure OpenSearch
{: .subsection }

Once you download OpenSearch, you can install it by running the following command:
`apt install ./opensearch-*.deb`

You'll need to update the JVM heap size in the `/etc/opensearch/jvm.options` file.

`nano /etc/opensearch/jvm.options`

look for the following lines:
```
-Xms1g
-Xmx1g
```

Change them based on how much memory you have available, the minimum recommended heap size is 4GB, and the maximum heap size is 31GB. This example uses 12GB. It is suggested you don't use more than 50% of your system memory for the JVM heap size and that both values are the same.
```
-Xms12g
-Xmx12g
```

You'll need to enable OpenSearch to start now and on boot with the following commands:
`systemctl enable --now opensearch`

### Install and Configure Elasticsearch
{: .subsection }

Once you download Elasticsearch, you can install it by running the following command:
`apt install ./elasticsearch-*.deb`

You'll need to update the JVM heap size in the `/etc/elasticsearch/jvm.options` file.

`nano /etc/elasticsearch/jvm.options`

look for the following lines:
```
-Xms1g
-Xmx1g
```

Change them based on how much memory you have available, the minimum recommended heap size is 4GB, and the maximum heap size is 31GB. This example uses 12GB. It is suggested you don't use more than 50% of your system memory for the JVM heap size and that both values are the same.
```
-Xms12g
-Xmx12g
```

You'll need to enable Elasticsearch to start now and on boot with the following commands:
`systemctl enable --now elasticsearch`

### Single Machine OpenSearch Example on Ubuntu or Debian
{: .subsection }
```
apt update
apt install -y wget curl
wget https://artifacts.opensearch.org/releases/bundle/opensearch/2.13.0/opensearch-2.13.0-linux-x64.deb

# You should change this password, if it isn't strong enough install will fail. :(
# Minimum 10 character password and must contain at least one uppercase letter, one lowercase letter, one digit, and one special character
export OPENSEARCH_INITIAL_ADMIN_PASSWORD="PleaseChangeM3!"

apt install -y ./opensearch-2.13.0-linux-x64.deb
systemctl enable --now opensearch

# Verify that OpenSearch is running
sleep 5
curl -k --user "admin:$OPENSEARCH_INITIAL_ADMIN_PASSWORD" https://localhost:9200/_cat/health

```

### Moving to multiple machines
{: .subsection }

When you are ready to have multiple OpenSearch/Elasticsearch machines or have the Arkime Sensor on a different machine, you'll need to update the `/etc/opensearch/opensearch.yml` or `/etc/elasticsearch/elasticsearch.yml` file to have the following settings:

```
network.host: 0.0.0.0
```

This causes OpenSearch/Elasticsearch to listen on all interfaces, not just localhost.
We also have a list of some common settings you may need to change in the [FAQ](https://arkime.com/faq#recommended-elasticsearch-settings), many of these can also be changed in the Arkime UI.


# Installing Arkime Sensors
{: .section-header }

Once you have a working OpenSearch/Elasticsearch cluster you can install the Arkime sensor.

### Download Arkime
{: .subsection }

If new to Arkime we recommend starting with the latest [stable version](https://github.com/arkime/arkime/releases/latest), however if you like to use the latest and greatest we have a [latest commit version](https://github.com/arkime/arkime/releases/last-commit) that is rebuilt after every commit to github.

The download page for each release contains multiple Arkime packages.
When choosing an Arkime package, please select a version that corresponds to the Operating System and the architecture of your system.

NOTE: A clear indication of the incorrect download are libssl or libyaml errors when trying to run capture.

### Installing Arkime Package
{: .subsection }

After downloading the Arkime package, you can install it by running the following commands:
* Ubuntu: `apt install ./arkime-*.deb`
* EL: `yum install ./arkime-*.rpm`

### Initialize the OpenSearch/Elasticsearch database
{: .subsection }

Once the Arkime package is installed, you need to initialize the OpenSearch/Elasticsearch database.
Most database operations are completed using the `db.pl` script located in the `/opt/arkime/db` directory.
You'll need to provide the URL of the OpenSearch/Elasticsearch database and the password you set during the OpenSearch/Elasticsearch installation.
If using the builtin OpenSearch/Elasticsearch certificates, you'll need to add a --insecure option if not on the same server.
```
/opt/arkime/db/db.pl --esuser admin https://localhost:9200 init
```

### Configure Arkime
{: .subsection }

We provide a simple Configuration script that will take a sample config.ini and create a new one with the correct settings.
To use the Configuration script, run the following command: `/opt/arkime/bin/Configure`
You can always edit the /opt/arkime/etc/config.ini file directly after running Configure.

### Adding admin user
{: .subsection }

Before you can use the Arkime UI, you must add the first user.
```
/opt/arkime/bin/arkime_add_user.sh admin "Admin User" changeme --admin
```
You can change the password or other settings later in the Arkime UI under the Users tab.

### Start the Arkime Sensor
{: .subsection }

To start the Arkime sensor, run the following command: `systemctl enable --now arkimecapture` and `systemctl enable --now arkimeviewer` which will start the capture and viewer services now and on boot.
If there are issues, log files are located in the `/opt/arkime/logs` directory.

### Accessing the Arkime UI
{: .subsection }

Once the Arkime sensor is running, you can access the Arkime UI by navigating to `http://<hostname>:8005` in your web browser.
Use the authentication information from above, username `admin` and the password is `changeme` in the example.

### Single Machine Arkime Example on Ubuntu 22 LTS
{: .subsection }
```
apt update
apt install -y wget iproute2 ethtool
#wget https://github.com/arkime/arkime/releases/download/v5.2.0/arkime_5.2.0-1.ubuntu2204_amd64.deb
#apt install -y ./arkime_5.2.0-1.ubuntu2204_amd64.deb
wget https://github.com/arkime/arkime/releases/download/last-commit/arkime-main_ubuntu2204_amd64.deb
apt install -y ./arkime-main_ubuntu2204_amd64.deb

# Configure Arkime
/opt/arkime/bin/Configure
#### Interface: the interface to monitor
#### Install Elasticsearch: no
#### OpenSearch/Elasticsearch URL: https://localhost:9200
#### OpenSearch/Elasticsearch User: admin
#### OpenSearch/Elasticsearch Password: PleaseChangeM3!
#### Password: A new password, not the ES password
#### Download GeoIP: yes

# Initialize the database, use the password from OpenSearch/Elasticsearch!!!
/opt/arkime/db/db.pl --esuser admin https://localhost:9200 init

# Create the admin user
/opt/arkime/bin/arkime_add_user.sh admin "Admin User" changeme --admin

# Start the Arkime Sensor
systemctl enable --now arkimecapture
systemctl enable --now arkimeviewer

# Verify that Arkime is running
sleep 1
tail /opt/arkime/logs/*.log
curl -u admin:changeme --digest http://localhost:8005/eshealth.json
```

# Arkime isn't working
{: .section-header }

If you are having issues with Arkime, please see our [FAQ](https://arkime.com/faq#arkime-is-not-working) for common issues and solutions.
{: .mb-4 }

</div>
